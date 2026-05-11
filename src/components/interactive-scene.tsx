"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function ShapeIco({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.25;
    ref.current.rotation.y += dt * 0.35;
    const target = hovered ? 1.15 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4} position={position}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.85, 1]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.4}
          roughness={0.15}
          distort={0.28}
          speed={2}
          emissive={color}
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ShapeTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.5;
    ref.current.rotation.z += dt * 0.18;
    const target = hovered ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
  });
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.6} position={position}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.55, 0.18, 96, 24]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  );
}

function ShapeOcta({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.4;
    ref.current.rotation.y -= dt * 0.3;
    const target = hovered ? 1.25 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
  });
  return (
    <Float speed={1.0} rotationIntensity={0.3} floatIntensity={1.2} position={position}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.55}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParallaxRig() {
  useFrame((state) => {
    const x = state.pointer.x * 0.4;
    const y = state.pointer.y * 0.25;
    state.camera.position.x += (x - state.camera.position.x) * 0.04;
    state.camera.position.y += (-y - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function InteractiveScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[6, 6, 6]} intensity={0.7} color="#818cf8" />
          <pointLight position={[-6, -4, -4]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[0, -6, 4]} intensity={0.3} color="#06b6d4" />

          <ShapeIco position={[-2.4, 1.0, 0]} color="#6366f1" />
          <ShapeTorus position={[2.2, -0.4, -0.4]} color="#3b82f6" />
          <ShapeOcta position={[0.4, -1.7, 0.6]} color="#06b6d4" />

          <Sparkles count={260} size={2} scale={[10, 8, 10]} speed={0.35} color="#a5b4fc" opacity={0.6} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.45}
            minPolarAngle={Math.PI / 2.3}
            maxPolarAngle={Math.PI / 1.7}
            rotateSpeed={0.5}
            makeDefault
          />
          <ParallaxRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
