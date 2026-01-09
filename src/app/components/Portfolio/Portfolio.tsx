'use client';

import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Fog } from 'three';
import TunnelGallery from '../Three/TunnelGallery';
import { useTheme } from '../../context/ThemeContext';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });
  
  const widthScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Theme Colors
  const fogColor = theme === 'light' ? '#FDF8F2' : '#000000';
  const isDarkMode = theme !== 'light';

  return (
    <section ref={containerRef} className={styles.section} id="work">
      <div className={styles.stickyContainer}>
        
        {/* UI Overlay */}
        <div className={styles.overlayUI}>
            <div className={styles.header}>
                <span className={styles.label}>Selected Works</span>
                <h2 className={styles.title}>The Digital Benchmarks</h2>
            </div>
            
            <div className={styles.progress}>
                <motion.div 
                    className={styles.progressBar} 
                    style={{ scaleX: widthScale }} 
                />
            </div>
        </div>

        {/* 3D Scene */}
        <div className={styles.canvasWrapper}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {/* Fog for depth fading */}
                <fog attach="fog" args={[fogColor, 5, 25]} /> 
                
                <ambientLight intensity={1} />
                
                <TunnelGallery scrollProgress={progress} isDarkMode={isDarkMode} />
            </Canvas>
        </div>

      </div>
    </section>
  );
}
