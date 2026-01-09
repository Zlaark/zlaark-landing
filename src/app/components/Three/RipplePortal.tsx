'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uDistortion;
uniform vec2 uMouse;

varying vec2 vUv;

// Simplex Noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    
    // Mouse Interaction
    float mouseDist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist);
    
    // Liquid Distortion
    float noise = snoise(uv * 2.0 + uTime * 0.15 - mouseInfluence * 0.5);
    float wave = sin(uv.y * 5.0 + uTime + mouseInfluence * 5.0) * uDistortion;
    
    // Mix Colors based on Noise + Mouse
    vec3 color = mix(uColor1, uColor2, noise + wave + 0.5 + mouseInfluence * 0.2);
    
    // Soft Vignette
    float dist = distance(uv, vec2(0.5));
    color *= 1.1 - dist * 0.4;

    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface RipplePortalProps {
    color1: string;
    color2: string;
}

export default function RipplePortal({ color1, color2 }: RipplePortalProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();
    
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1) },
        uColor2: { value: new THREE.Color(color2) },
        uDistortion: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    }), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            
            // Lerp Colors
            materialRef.current.uniforms.uColor1.value.lerp(new THREE.Color(color1), 0.05);
            materialRef.current.uniforms.uColor2.value.lerp(new THREE.Color(color2), 0.05);

            // Subtle generic movement
            materialRef.current.uniforms.uDistortion.value = Math.sin(state.clock.getElapsedTime()) * 0.05 + 0.05;

            // Map mouse -1 to 1 to UV 0 to 1
            const x = (state.pointer.x + 1) / 2;
            const y = (state.pointer.y + 1) / 2;
            materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.1);
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
