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

  useFrame((state, delta) => {
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

      // Throttle CSS variable updates (every 3rd frame ~20fps is enough for CSS)
      const frameCount = Math.floor(state.clock.getElapsedTime() * 60);
      if (frameCount % 3 === 0) {
        const cssX = uniforms.uMouse.value.x * 100;
        const cssY = (1.0 - uniforms.uMouse.value.y) * 100;
        document.body.style.setProperty('--spot-x', `${cssX}%`);
        document.body.style.setProperty('--spot-y', `${cssY}%`);
      }
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

