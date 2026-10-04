"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared GLSL: cheap 3D value noise + fbm                             */
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
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }
`;

/* ------------------------------------------------------------------ */
/* Accretion disk                                                      */
/* ------------------------------------------------------------------ */

const DISK_INNER = 1.35;
const DISK_OUTER = 4.4;

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

    // Inner gas orbits faster than outer gas (roughly Keplerian).
    float swirl = a + uTime * 1.6 / pow(r, 1.5);
    vec3 q = vec3(cos(swirl) * 1.7, sin(swirl) * 1.7, r * 5.0);
    float n = fbm(q + vec3(0.0, 0.0, -uTime * 0.25));
    float streaks = fbm(vec3(cos(swirl) * 6.0, sin(swirl) * 6.0, r * 14.0));

    vec3 white  = vec3(1.0, 0.96, 0.88);
    vec3 orange = vec3(1.0, 0.55, 0.18);
    vec3 violet = vec3(0.55, 0.30, 1.0);
    vec3 col = mix(white, orange, smoothstep(0.0, 0.32, t));
    col = mix(col, violet, smoothstep(0.45, 0.95, t));

    float body = pow(1.0 - t, 1.7) * (0.45 + 1.1 * n) * (0.75 + 0.5 * streaks);
    float edges = smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.72, 1.0, t));

    // Relativistic beaming: the side moving toward us is brighter.
    float doppler = 1.0 + 0.65 * cos(a + 0.4);

    float alpha = body * edges * doppler;
    gl_FragColor = vec4(col * alpha * 1.7, alpha);
  }
`;

function AccretionDisk() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInner: { value: DISK_INNER },
      uOuter: { value: DISK_OUTER },
    }),
    [],
  );

  useFrame((_, dt) => {
    if (material.current) material.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh renderOrder={2}>
      <ringGeometry args={[DISK_INNER, DISK_OUTER, 256, 8]} />
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
/* Lensed halo: photon ring + the far side of the disk bent over      */
/* the top and under the bottom of the horizon. Always faces camera.  */
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
    vec2 p = (vUv - 0.5) * 6.0;   // plane is 6 units wide, horizon radius = 1
    float r = length(p);
    float a = atan(p.y, p.x);

    float photon = exp(-pow((r - 1.06) * 26.0, 2.0)) * 1.6;

    float swirl = a + uTime * 0.9 / pow(r, 1.5);
    float n = fbm(vec3(cos(swirl) * 2.0, sin(swirl) * 2.0, r * 7.0 - uTime * 0.2));
    float band = smoothstep(1.02, 1.16, r) * (1.0 - smoothstep(1.25, 2.1, r));
    // Lensed light is strongest above and below the horizon.
    float arc = 0.35 + 0.65 * pow(abs(p.y) / max(r, 0.001), 1.4);
    float lensed = band * arc * (0.45 + 1.5 * n);

    float glow = exp(-(r - 1.0) * 1.9) * 0.22 * step(1.0, r);

    vec3 hot = vec3(1.0, 0.78, 0.5);
    vec3 cool = vec3(0.58, 0.42, 1.0);
    vec3 col = hot * (photon + lensed) + cool * glow;
    float alpha = clamp(photon + lensed + glow, 0.0, 1.0);
    alpha *= 1.0 - smoothstep(2.4, 3.0, r);
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

function LensedHalo() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, dt) => {
    if (material.current) material.current.uniforms.uTime.value += dt;
  });

  return (
    <Billboard>
      <mesh renderOrder={1}>
        <planeGeometry args={[6, 6]} />
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
/* Infalling particles                                                 */
/* ------------------------------------------------------------------ */

function softDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.45)");
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
  const warm = new THREE.Color("#ffb070");
  const cool = new THREE.Color("#a78bfa");
  for (let i = 0; i < count; i++) {
    radius[i] = DISK_INNER + Math.random() * (DISK_OUTER + 1.5 - DISK_INNER);
    angle[i] = Math.random() * Math.PI * 2;
    height[i] = (Math.random() - 0.5) * 0.12;
    const c = warm.clone().lerp(cool, Math.random() * 0.8);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  return { radius, angle, height, positions, colors };
}

/** Advance every particle one step: orbit faster near the hole, drift inward, respawn at the rim. */
function stepDust(d: Dust, dt: number) {
  for (let i = 0; i < d.radius.length; i++) {
    const r = d.radius[i];
    d.angle[i] += (1.4 / Math.pow(r, 1.5)) * dt;
    d.radius[i] -= (0.05 + 0.25 / r) * dt;
    if (d.radius[i] < 1.05) {
      d.radius[i] = DISK_OUTER + Math.random() * 1.5;
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
        size={0.06}
        map={texture}
        vertexColors
        transparent
        opacity={0.85}
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

  // Desktop: sit to the right of the headline. Narrow: sit above it.
  const position: [number, number, number] = wide
    ? [viewport.width * 0.27, 0.1, 0]
    : [0, viewport.height * 0.24, 0];
  const scale = wide ? Math.min(0.82, viewport.width / 15.5) : Math.min(0.62, viewport.width / 9.5);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle parallax toward the pointer.
    const tx = state.pointer.y * 0.06;
    const ty = state.pointer.x * 0.1;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Event horizon: pure black, writes depth so it hides what's behind. */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <LensedHalo />

      <group rotation={[-Math.PI / 2 + 0.3, 0, 0.14]}>
        <AccretionDisk />
        <InfallingDust count={particles} />
      </group>

    </group>
  );
}

export function BlackHoleScene({
  active,
  particles = 1400,
}: {
  active: boolean;
  particles?: number;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.6, 9.5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>

        <Stars radius={60} depth={40} count={2500} factor={3} saturation={0.4} fade speed={0.4} />
        <BlackHole particles={particles} />
      </Suspense>
    </Canvas>
  );
}
