'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, Text, useScroll as useDreiScroll } from '@react-three/drei'; // Actually we will control via props
import * as THREE from 'three';
import { easing } from 'maath';

interface ProjectProps {
    position: [number, number, number];
    rotation: [number, number, number];
    url: string;
    title: string;
    index: number;
    zProgress: number; // Current camera Z or scroll progress
    isDarkMode: boolean;
    hideText?: boolean;
    subtitle?: string;
}

// Helper to create texture placeholders
const IMG_URLS = [
    "/ourwork.png",
    "/unextdoor.png",
    "/gessure.png",
    "/vaarakie.png",
    "/skoal.png",
];

function ProjectItem({ position, rotation, url, title, subtitle, index, zProgress, isDarkMode, hideText }: ProjectProps) {
    const group = useRef<THREE.Group>(null);
    const imageRef = useRef<any>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
    });

    return (
        <group ref={group} position={position} rotation={rotation}>
            <Image
                ref={imageRef}
                url={url}
                transparent
                scale={5}
            />
            {!hideText && (
                <>
                    <Text
                        position={[0, -2.5, 0.1]}
                        fontSize={0.5}
                        color={isDarkMode ? "white" : "#1a1a1a"}
                        anchorX="center"
                        anchorY="top"
                    >
                        {title.toUpperCase()}
                    </Text>
                    <Text
                        position={[0, -3.2, 0.1]}
                        fontSize={0.25}
                        color={isDarkMode ? "#d4af37" : "#b8860b"}
                        anchorX="center"
                        anchorY="top"
                        letterSpacing={0.1}
                        textAlign="center"
                    >
                        {subtitle || `DIGITAL BENCHMARK 0${index + 1}`}
                    </Text>
                </>
            )}
        </group>
    );
}

export default function TunnelGallery({ scrollProgress, isDarkMode }: { scrollProgress: number, isDarkMode: boolean }) {
    const { camera } = useThree();

    // Projects Config
    const projects = useMemo(() => [
        { title: "Venture Core", pos: [-3, 0, 0], rot: [0, 0.2, 0] },
        { title: "UNEXT DOOR", subtitle: "AI LANGUAGE TUTOR", pos: [3, 0, -10], rot: [0, -0.2, 0] },
        { title: "GESSURE", subtitle: "India’s Next-Gen\nProfessional Networking Platform.", pos: [-3, 0, -20], rot: [0, 0.2, 0] },
        { title: "VARAAKIE", subtitle: "Varaakie — modern fashion for\n effortless everyday style.", pos: [3, 0, -30], rot: [0, -0.2, 0] },
        { title: "SKOAL", subtitle: "Skoal Solutions is a global HRand payroll\n platform that simplifies workforce management", pos: [-3, 0, -40], rot: [0, 0.2, 0] },
    ], []);

    useFrame((state, delta) => {
        // Map 0-1 scrollProgress to Camera Z
        // 0 -> 5 (Start)
        // 1 -> -45 (End)
        const targetZ = 5 - (scrollProgress * 55);

        // Smooth camera movement
        easing.damp(camera.position, 'z', targetZ, 0.2, delta);

        // Slight camera sway
        const mouseX = (state.pointer.x * 2);
        const mouseY = (state.pointer.y * 2);
        easing.damp(camera.position, 'x', mouseX, 0.2, delta);
        easing.damp(camera.position, 'y', mouseY, 0.2, delta);
    });

    return (
        <group>
            {projects.map((p, i) => (
                <ProjectItem
                    key={i}
                    index={i}
                    url={IMG_URLS[i % IMG_URLS.length]}
                    title={p.title}
                    position={p.pos as [number, number, number]}
                    rotation={p.rot as [number, number, number]}
                    zProgress={scrollProgress}
                    isDarkMode={isDarkMode}
                    hideText={i === 0}
                    subtitle={p.subtitle}
                />
            ))}
        </group>
    );
}
