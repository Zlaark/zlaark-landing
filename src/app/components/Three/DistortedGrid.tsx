'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { gridVertexShader, gridFragmentShader } from './shaders/gridShaders';

import { useTheme } from '../../context/ThemeContext';

const GridMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme(); // Get theme from context
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uIsDarkMode: { value: 1.0 } // 1.0 = Dark, 0.0 = Light
    }),
    []
  );

  // Update uniform when theme changes
  useEffect(() => {
    if (uniforms) {
      uniforms.uIsDarkMode.value = theme === 'dark' ? 1.0 : 0.0;
    }
  }, [theme, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Lerp mouse for smoothness
      // Convert pointer (-1 to 1) to UV space (0 to 1)
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.1;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default function DistortedGrid() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <GridMesh />
      </Canvas>
    </div>
  );
}
