'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function Ring({ text, radius, speed, y, color, fontSize }: { text: string; radius: number; speed: number; y: number; color: string; fontSize: number }) {
    const groupRef = useRef<THREE.Group>(null);
    
    // Repeat text to fill the circle roughly
    // circumference = 2 * pi * r
    // Assume char width ~ 0.5 units
    // approximate chars needed:
    const circumference = 2 * Math.PI * radius;
    const charsFit = Math.floor(circumference / (0.8 * (fontSize / 1.2))); // scale spacing with font size
    const repeatCount = Math.ceil(charsFit / text.length);
    const fullText = Array(repeatCount).fill(text).join(" • ");
    
    const words = useMemo(() => {
        const arr = [];
        const totalChars = fullText.length;
        const angleStep = (Math.PI * 2) / totalChars;
        
        for (let i = 0; i < totalChars; i++) {
            const char = fullText[i];
            const angle = i * angleStep;
            
            // Position on circle
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            
            // Rotation: face outward
            const rotY = angle; 
            
            arr.push({ char, x, z, rotY });
        }
        return arr;
    }, [fullText, radius]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += speed * delta;
        }
    });

    return (
        <group ref={groupRef} position={[0, y, 0]}>
            {words.map((item, i) => (
                <Text
                    key={i}
                    position={[item.x, 0, item.z]}
                    rotation={[0, item.rotY, 0]}
                    fontSize={fontSize}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {item.char}
                </Text>
            ))}
        </group>
    );
}

export default function KineticRings({ isDarkMode }: { isDarkMode: boolean }) {
    const { viewport } = useThree();
    
    // Scale based on viewport width - smaller on mobile
    const isMobile = viewport.width < 10; // Approximate threshold for mobile
    const scale = isMobile ? 0.55 : 1;
    
    const ringRadius = 8 * scale;
    const fontSize = 1.2 * scale;
    const sphereRadius = 4 * scale;
    const ringY = 1.5 * scale;

    return (
        <group rotation={[0, 0, 0.1]}> {/* Slight tilt */}
            <Ring 
                text="JOIN THE VANGUARD" 
                radius={ringRadius} 
                speed={0.2} 
                y={ringY} 
                color={isDarkMode ? "#ffffff" : "#1a1a1a"}
                fontSize={fontSize}
            />
            <Ring 
                text="BUILD THE FUTURE" 
                radius={ringRadius} 
                speed={-0.2} 
                y={-ringY} 
                color="#d4af37" // Gold
                fontSize={fontSize}
            />
             {/* Center decorative line or core? */}
             <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[sphereRadius, 32, 32]} />
                <meshStandardMaterial 
                    color={isDarkMode ? "#000" : "#fff"} 
                    emissive={isDarkMode ? "#111" : "#ccc"} 
                    roughness={0.1} 
                    metalness={1} 
                />
             </mesh>
        </group>
    );
}

