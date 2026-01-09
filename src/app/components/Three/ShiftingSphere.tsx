'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { easing } from 'maath';

interface ShiftingSphereProps {
    color: string;
    distort: number;
    speed: number;
}

export default function ShiftingSphere({ color, distort, speed }: ShiftingSphereProps) {
    const materialRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Smoothly interpolate material properties
            easing.dampC(materialRef.current.color, color, 0.2, delta);
            easing.damp(materialRef.current, 'distort', distort, 0.2, delta);
            easing.damp(materialRef.current, 'speed', speed, 0.2, delta);
        }
    });

    return (
        <Sphere args={[1, 64, 64]} scale={2}>
            <MeshDistortMaterial
                ref={materialRef}
                color={color}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.2}
                roughness={0.2}
            />
        </Sphere>
    );
}
