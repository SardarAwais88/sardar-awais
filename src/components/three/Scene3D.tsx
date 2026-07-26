'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f5d4');
    const purple = new THREE.Color('#7b61ff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const c = Math.random() > 0.5 ? cyan : purple;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape({ position, color, speed = 1, shape = 'box' }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  shape?: 'box' | 'octahedron' | 'torus' | 'icosahedron';
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
  });

  const getGeometry = () => {
    switch (shape) {
      case 'octahedron':
        return <octahedronGeometry args={[0.4, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.3, 0.12, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.35, 0]} />;
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  };

  return (
    <mesh ref={mesh} position={position}>
      {getGeometry()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || navigator.hardwareConcurrency < 4);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return (
      <div className="canvas-container" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,245,212,0.05), transparent)' }} />
    );
  }

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f5d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7b61ff" />

        <Particles count={150} />

        <FloatingShape position={[-4, 2, -3]} color="#00f5d4" speed={0.8} shape="octahedron" />
        <FloatingShape position={[4, -1, -4]} color="#7b61ff" speed={0.6} shape="torus" />
        <FloatingShape position={[-3, -2, -2]} color="#ff6b6b" speed={1.0} shape="icosahedron" />
        <FloatingShape position={[3, 3, -5]} color="#ffd700" speed={0.7} shape="box" />
        <FloatingShape position={[5, 1, -6]} color="#00f5d4" speed={0.5} shape="octahedron" />
        <FloatingShape position={[-5, -3, -4]} color="#7b61ff" speed={0.9} shape="torus" />
      </Canvas>
    </div>
  );
}
