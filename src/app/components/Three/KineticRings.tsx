'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function Ring({ text, radius, speed, y, color }: { text: string; radius: number; speed: number; y: number; color: string }) {
    const groupRef = useRef<THREE.Group>(null);
    
    // Repeat text to fill the circle roughly
    // circumference = 2 * pi * r
    // Assume char width ~ 0.5 units
    // approximate chars needed:
    const circumference = 2 * Math.PI * radius;
    const charsFit = Math.floor(circumference / 0.8); // rough spacing
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
                    fontSize={1.2}
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
    return (
        <group rotation={[0, 0, 0.1]}> {/* Slight tilt */}
            <Ring 
                text="JOIN THE VANGUARD" 
                radius={8} 
                speed={0.2} 
                y={1.5} 
                color={isDarkMode ? "#ffffff" : "#1a1a1a"}
            />
            <Ring 
                text="BUILD THE FUTURE" 
                radius={8} 
                speed={-0.2} 
                y={-1.5} 
                color="#d4af37" // Gold
            />
             {/* Center decorative line or core? */}
             <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[4, 32, 32]} />
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
