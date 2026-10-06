"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/*
 * A black hole in the style of Interstellar's Gargantua:
 *  - a pure black shadow,
 *  - a thin accretion disk seen almost edge-on, crossing in front of it,
 *  - the far side of that disk bent by gravity into a halo over the top
 *    and (fainter) under the bottom of the shadow,
 *  - a thin, bright photon ring hugging the edge,
 *  - bloom so the hot gas glows instead of looking painted on.
 */

const HORIZON = 1; // radius of the black shadow
const DISK_INNER = 1.1;
const DISK_OUTER = 4.6;
const TILT = 0.13; // radians above edge-on

/* ------------------------------------------------------------------ */
/* Shared GLSL: smooth value noise + fbm                               */
/* ------------------------------------------------------------------ */

const NOISE = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
  // Blackbody-ish ramp: deep orange at the rim, near-white at the inner edge.
  vec3 heat(float t) {
    vec3 rim   = vec3(0.85, 0.30, 0.06);
    vec3 warm  = vec3(1.00, 0.62, 0.22);
    vec3 hot   = vec3(1.00, 0.90, 0.72);
    return mix(mix(rim, warm, smoothstep(0.0, 0.55, t)), hot, smoothstep(0.55, 1.0, t));
  }
`;

/* ------------------------------------------------------------------ */
/* Accretion disk (the part in front of / around the shadow)           */
/* ------------------------------------------------------------------ */

const diskVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragment = /* glsl */ `
  uniform float uTime;
  uniform float uInner;
  uniform float uOuter;
  varying vec2 vPos;
  ${NOISE}
  void main() {
    float r = length(vPos);
    float a = atan(vPos.y, vPos.x);
    float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);

    // Inner gas orbits faster than outer gas.
    float swirl = a + uTime * 0.9 / pow(r, 1.5);
    float gas = fbm(vec3(cos(swirl) * 2.2, sin(swirl) * 2.2, r * 2.4 - uTime * 0.08));
    float fine = fbm(vec3(cos(swirl) * 5.0, sin(swirl) * 5.0, r * 7.0));

    float heatT = 1.0 - t;
    vec3 col = heat(heatT);

    float density = pow(1.0 - t, 1.8) * (0.5 + 0.8 * gas) * (0.8 + 0.35 * fine);
    float edges = smoothstep(0.0, 0.015, t) * (1.0 - smoothstep(0.55, 1.0, t));

    // Relativistic beaming: the side coming toward us is much brighter.
    float doppler = 0.55 + 0.75 * (0.5 + 0.5 * cos(a + 0.25));

    float alpha = density * edges * doppler;
    gl_FragColor = vec4(col * alpha * 2.2, alpha);
  }
`;

function AccretionDisk() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uInner: { value: DISK_INNER }, uOuter: { value: DISK_OUTER } }),
    [],
  );
  useFrame((_, dt) => {
    if (material.current) material.current.uniforms.uTime.value += Math.min(dt, 0.05);
  });
  return (
    <mesh renderOrder={2}>
      <ringGeometry args={[DISK_INNER, DISK_OUTER, 256, 12]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={diskVertex}
        fragmentShader={diskFragment}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Lensed far side + photon ring, always facing the camera             */
/* ------------------------------------------------------------------ */

const haloVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const haloFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = (vUv - 0.5) * 8.0;   // plane is 8 units wide; shadow radius = 1
    float r = length(p);
    float a = atan(p.y, p.x);
    float up = p.y / max(r, 1e-4);          // +1 straight up, -1 straight down

    // The far side of the disk, lifted over the top (thick, bright)
    // and pulled under the bottom (thinner, dimmer).
    float topW = 0.62, botW = 0.26;
    float width = mix(botW, topW, smoothstep(-1.0, 1.0, up));
    float inner = 1.05;
    float band = smoothstep(inner, inner + 0.02, r) * (1.0 - smoothstep(inner + width * 0.55, inner + width, r));
    // Fade out toward the left and right, where the real disk takes over.
    float vertical = smoothstep(0.08, 0.6, abs(up));
    // Streaks run along the arc, like the disk's own gas lanes.
    float gas = fbm(vec3(a * 2.2 + uTime * 0.12, r * 16.0, 0.5));
    gas = mix(gas, fbm(vec3(a * 6.0 - uTime * 0.2, r * 40.0, 2.0)), 0.35);
    float lensed = band * vertical * (0.25 + 1.2 * gas * gas) * (up > 0.0 ? 1.0 : 0.55);
    // Same beaming as the disk: brighter on the left.
    lensed *= 0.6 + 0.6 * (0.5 - 0.5 * p.x / max(r, 1e-4));

    float tLens = 1.0 - clamp((r - inner) / width, 0.0, 1.0);
    vec3 lensCol = heat(0.35 + 0.65 * tLens);

    // Photon ring: a razor-thin bright circle right at the edge of the shadow.
    float photon = exp(-pow((r - 1.015) * 150.0, 2.0)) * (0.55 + 0.6 * (0.5 - 0.5 * p.x / max(r, 1e-4)));

    // Soft warm haze around everything.
    float haze = exp(-(r - 1.0) * 1.6) * 0.05 * step(1.0, r);

    vec3 col = lensCol * lensed * 1.45 + vec3(1.0, 0.78, 0.52) * photon + vec3(1.0, 0.55, 0.25) * haze;
    float alpha = clamp(lensed + photon + haze, 0.0, 1.0);
    alpha *= 1.0 - smoothstep(3.2, 4.0, r);
    gl_FragColor = vec4(col, alpha);
  }
`;

function LensedHalo() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, dt) => {
    if (material.current) material.current.uniforms.uTime.value += Math.min(dt, 0.05);
  });
  return (
    <Billboard>
      {/* Sit just behind the shadow so the black disc covers the centre. */}
      <mesh renderOrder={1} position={[0, 0, -0.01]}>
        <planeGeometry args={[8, 8]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

/* ------------------------------------------------------------------ */
/* A few bright motes drifting inward: subtle, not grainy               */
/* ------------------------------------------------------------------ */

function softDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

type Dust = {
  radius: Float32Array;
  angle: Float32Array;
  height: Float32Array;
  positions: Float32Array;
  colors: Float32Array;
};

function createDust(count: number): Dust {
  const radius = new Float32Array(count);
  const angle = new Float32Array(count);
  const height = new Float32Array(count);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const warm = new THREE.Color("#ffc58a");
  const hot = new THREE.Color("#fff1dc");
  for (let i = 0; i < count; i++) {
    radius[i] = DISK_INNER + Math.random() * (DISK_OUTER - DISK_INNER);
    angle[i] = Math.random() * Math.PI * 2;
    height[i] = (Math.random() - 0.5) * 0.05;
    const c = warm.clone().lerp(hot, Math.random());
    colors.set([c.r, c.g, c.b], i * 3);
  }
  return { radius, angle, height, positions, colors };
}

/** Advance every mote: orbit faster near the hole, drift inward, respawn at the rim. */
function stepDust(d: Dust, dt: number) {
  for (let i = 0; i < d.radius.length; i++) {
    const r = d.radius[i];
    d.angle[i] += (0.9 / Math.pow(r, 1.5)) * dt;
    d.radius[i] -= (0.03 + 0.12 / r) * dt;
    if (d.radius[i] < DISK_INNER) {
      d.radius[i] = DISK_OUTER - Math.random() * 0.6;
      d.angle[i] = Math.random() * Math.PI * 2;
    }
    d.positions[i * 3] = Math.cos(d.angle[i]) * d.radius[i];
    d.positions[i * 3 + 1] = Math.sin(d.angle[i]) * d.radius[i];
    d.positions[i * 3 + 2] = d.height[i];
  }
}

function InfallingDust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(() => softDotTexture(), []);
  const state = useMemo(() => createDust(count), [count]);

  useFrame((_, rawDt) => {
    stepDust(state, Math.min(rawDt, 0.05));
    const attr = points.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (attr) attr.needsUpdate = true;
  });

  return (
    <points ref={points} renderOrder={3}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[state.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[state.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        map={texture}
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

function BlackHole({ particles }: { particles: number }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const wide = size.width / size.height > 1.05;

  // Desktop: sit to the right of the headline, inside the page column (the
  // same widths as .shell in globals.css), so wide monitors don't push it to
  // the far edge. Narrow: sit above the headline.
  const W = size.width;
  const column = W >= 2400 ? 1900 : W >= 1800 ? 1600 : Math.min(W, 1280);
  const pxPerUnit = W / viewport.width;
  const centreX = (W - column) / 2 + column * 0.8; // 80% across the column
  // Disk radius about a third of the column wide, but never taller than the screen allows.
  const wideScale = Math.min((column * 0.34) / (4.6 * pxPerUnit), (size.height * 0.3) / pxPerUnit);
  const position: [number, number, number] = wide
    ? [(centreX - W / 2) / pxPerUnit, 0.1, 0]
    : [0, viewport.height * 0.24, 0];
  const scale = wide ? wideScale : Math.min(0.5, viewport.width / 11.5);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle parallax toward the pointer; never tips far from edge-on.
    const tx = state.pointer.y * 0.03;
    const ty = state.pointer.x * 0.08;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Shadow: a flat black disc that always faces the camera, so it lines up
          exactly with the photon ring. It writes depth, so the far half of the
          accretion disk hides behind it while the near half crosses in front. */}
      <Billboard>
        <mesh renderOrder={0}>
          <circleGeometry args={[HORIZON, 128]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </Billboard>

      <LensedHalo />

      <group rotation={[-Math.PI / 2 + TILT, 0, 0.06]}>
        <AccretionDisk />
        <InfallingDust count={particles} />
      </group>
    </group>
  );
}

export function BlackHoleScene({
  active,
  particles = 500,
  bloom = true,
}: {
  active: boolean;
  particles?: number;
  /** The glow pass is the heaviest part; phones skip it. */
  bloom?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.25, 9.5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Stars radius={60} depth={40} count={1400} factor={2.5} saturation={0.2} fade speed={0.3} />
        <BlackHole particles={particles} />
        {bloom && (
        <EffectComposer multisampling={4}>
          <Bloom intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.2} mipmapBlur radius={0.42} />
        </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
