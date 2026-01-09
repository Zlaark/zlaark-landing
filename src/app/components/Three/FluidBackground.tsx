'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { vertexShader } from './shaders/vertexShader';
import { fragmentShader } from './shaders/fragmentShader';

const FluidMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smooth mouse lerp
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.1;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[2, 2, 1]}>
      <planeGeometry args={[10, 10, 128, 128]} /> {/* High poly for smooth deform */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default function FluidBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <FluidMesh />
      </Canvas>
    </div>
  );
}
