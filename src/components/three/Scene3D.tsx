'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Float, MeshDistortMaterial, Sphere, Stars, Trail, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Mouse-tracked camera ─────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Glowing energy sphere ─────────────────────────── */
function EnergySphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.12;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere ref={mesh} args={[1.4, 64, 64]} position={[3.5, 0.5, -2]}>
        <MeshDistortMaterial
          color="#00f5d4"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.18}
          wireframe={false}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[1.0, 32, 32]} position={[3.5, 0.5, -2]}>
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.05} />
      </Sphere>
    </Float>
  );
}

/* ── DNA double helix ─────────────────────────────── */
function DNAHelix() {
  const group = useRef<THREE.Group>(null);
  const strand1Points: [number, number, number][] = [];
  const strand2Points: [number, number, number][] = [];

  const count = 40;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 6;
    const y = (i / count) * 8 - 4;
    strand1Points.push([Math.cos(t) * 0.8, y, Math.sin(t) * 0.8]);
    strand2Points.push([Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8]);
  }

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={group} position={[-5, 0, -3]}>
      {strand1Points.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {strand2Points.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#7b61ff" emissive="#7b61ff" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Rungs */}
      {strand1Points.filter((_, i) => i % 4 === 0).map((p1, i) => {
        const p2 = strand2Points[i * 4];
        const mid: [number, number, number] = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2];
        const len = Math.sqrt(
          (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2
        );
        return (
          <mesh key={`rung-${i}`} position={mid}>
            <cylinderGeometry args={[0.02, 0.02, len, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Morphing torus knot ─────────────────────────────── */
function TorusKnot() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.25;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.35;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    mesh.current.scale.setScalar(s);
  });

  return (
    <Float speed={0.8} floatIntensity={1.2}>
      <mesh ref={mesh} position={[5, -2, -4]}>
        <torusKnotGeometry args={[0.6, 0.18, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#7b61ff"
          emissive="#7b61ff"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.7}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting ring system ─────────────────────────────── */
function OrbitalRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <group ref={group} position={[0, 1, -6]}>
      {[1.2, 1.8, 2.4].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.015, 8, 100]} />
          <meshStandardMaterial
            color={['#00f5d4', '#7b61ff', '#ff6b6b'][i]}
            emissive={['#00f5d4', '#7b61ff', '#ff6b6b'][i]}
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

/* ── Trailing particles ─────────────────────────────── */
function TrailingOrb({ color, radius, speed, yOffset }: { color: string; radius: number; speed: number; yOffset: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.position.x = Math.cos(t) * radius;
    mesh.current.position.y = Math.sin(t * 0.7) * 1.5 + yOffset;
    mesh.current.position.z = Math.sin(t) * radius;
  });

  return (
    <Trail width={0.3} length={6} color={color} attenuation={(t) => t * t}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

/* ── Large particle field ─────────────────────────────── */
function ParticleField({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const palette = [
      new THREE.Color('#00f5d4'),
      new THREE.Color('#7b61ff'),
      new THREE.Color('#ff6b6b'),
      new THREE.Color('#ffd700'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      sz[i] = Math.random() * 0.08 + 0.02;
    }
    return [pos, col, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Grid floor ─────────────────────────────── */
function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, '#1a1a3e', '#0d0d1f']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* ── Main Scene ─────────────────────────────── */
export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768 || navigator.hardwareConcurrency < 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return <div className="canvas-container" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,245,212,0.04), transparent)' }} />;
  }

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]}  intensity={1.2} color="#00f5d4" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7b61ff" />
        <pointLight position={[0, 5, 5]}     intensity={0.5} color="#ff6b6b" />
        <spotLight position={[0, 8, 2]} angle={0.4} penumbra={1} intensity={0.8} color="#ffffff" />

        {/* Camera follows mouse */}
        <CameraRig />

        {/* Star field background */}
        <Stars radius={60} depth={30} count={2000} factor={3} saturation={0.5} fade speed={0.5} />

        {/* 3D objects */}
        <EnergySphere />
        <DNAHelix />
        <TorusKnot />
        <OrbitalRings />

        {/* Trailing orbs */}
        <TrailingOrb color="#00f5d4" radius={4} speed={0.4} yOffset={0} />
        <TrailingOrb color="#7b61ff" radius={3} speed={0.6} yOffset={1} />
        <TrailingOrb color="#ff6b6b" radius={2.5} speed={0.8} yOffset={-1} />

        {/* Particle field */}
        <ParticleField count={400} />

        {/* Grid floor */}
        <GridFloor />
      </Canvas>
    </div>
  );
}
