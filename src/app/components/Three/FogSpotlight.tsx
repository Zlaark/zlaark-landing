'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { fogVertexShader, fogFragmentShader } from './shaders/fogShaders';
import { useTheme } from '../../context/ThemeContext';

// Global mouse position tracker (normalized 0-1)
const mousePosition = { x: 0.5, y: 0.5 };

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

  // Track mouse position globally to avoid R3F pointer stale state issues
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX / window.innerWidth;
      mousePosition.y = 1 - (e.clientY / window.innerHeight); // Flip Y for WebGL coordinates
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

      // Mobile Override: Force light to center
      if (size.width < 768) {
        // Smoothly return to manual center for mobile (visually calibrated)
        uniforms.uMouse.value.x += (0.7 - uniforms.uMouse.value.x) * 0.05;
        uniforms.uMouse.value.y += (0.75 - uniforms.uMouse.value.y) * 0.05;
      } else {
        // Desktop: Follow global mouse with smooth lerp (faster response)
        uniforms.uMouse.value.x += (mousePosition.x - uniforms.uMouse.value.x) * 0.15;
        uniforms.uMouse.value.y += (mousePosition.y - uniforms.uMouse.value.y) * 0.15;
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

