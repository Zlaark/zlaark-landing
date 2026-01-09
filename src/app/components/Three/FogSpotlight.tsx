'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { fogVertexShader, fogFragmentShader } from './shaders/fogShaders';
import { useTheme } from '../../context/ThemeContext';

const FogMesh = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIsDarkMode: { value: isDarkMode ? 1.0 : 0.0 }
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  // Update theme uniform when it changes
  useEffect(() => {
    uniforms.uIsDarkMode.value = isDarkMode ? 1.0 : 0.0;
  }, [isDarkMode, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;

      // Mobile Override: Force light to center
      if (size.width < 768) {
        // Smoothly return to manual center for mobile (visually calibrated)
        uniforms.uMouse.value.x += (0.7 - uniforms.uMouse.value.x) * 0.05;
        uniforms.uMouse.value.y += (0.75 - uniforms.uMouse.value.y) * 0.05;
      } else {
        // Desktop: Follow mouse with smooth lerp
        uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.12;
        uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.12;
      }

      // Update CSS variables for text masking (in percent)
      // Mirroring the shader coordinate system where center is 0.5, 0.5
      // Shader UVS: 0,0 bottom-left, 1,1 top-right
      // CSS Mask: 0% 0% top-left, 100% 100% bottom-right
      
      // Need to convert shader coords (uMouse) back to screen coords for CSS
      // uMouse.x: 0 (left) -> 1 (right)
      // uMouse.y: 0 (bottom) -> 1 (top)
      const cssX = uniforms.uMouse.value.x * 100;
      const cssY = (1.0 - uniforms.uMouse.value.y) * 100; // Invert Y for CSS
      
      document.body.style.setProperty('--spot-x', `${cssX}%`);
      document.body.style.setProperty('--spot-y', `${cssY}%`);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={fogVertexShader}
        fragmentShader={fogFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function FogSpotlight() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FogMesh isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
}

