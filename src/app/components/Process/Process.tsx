'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Process.module.css';

const steps = [
  {
    title: "Deep Discovery",
    desc: "We dive into the abyss of your market. Identifying voids, seizing opportunities, and mapping the psychology.",
    step: "01",
    art: "Lens"
  },
  {
    title: "Strategic Blueprint",
    desc: "Architecture before art. We build the skeletal logic of your platform to ensure every user interaction is intuitive.",
    step: "02",
    art: "Matrix"
  },
  {
    title: "Visual Alchemy",
    desc: "Transmuting pixels into emotion. High-fidelity design that uses color, type, and motion to command authority.",
    step: "03",
    art: "Flux"
  },
  {
    title: "Engineering",
    desc: "Pixel-perfect implementation. Our code is as beautiful as our design, optimized for speed and SEO dominance.",
    step: "04",
    art: "Reactor"
  },
  {
    title: "Validation",
    desc: "Stress-testing performance and edge-case security. We break it before your users do.",
    step: "05",
    art: "Shield"
  },
  {
    title: "Momentum",
    desc: "A deployment strategy that ensures maximum visibility. We don't just launch; we ignite your market presence.",
    step: "06",
    art: "Ascent"
  }
];

// Art Components
const ArtLens = () => (
    <div className={styles.artContainer}>
        <div className={`${styles.lensRing} ${styles.lens1}`} />
        <div className={`${styles.lensRing} ${styles.lens2}`} />
        <div className={`${styles.lensRing} ${styles.lens3}`} />
        <div className={styles.lensGlass} />
    </div>
);

const ArtMatrix = () => (
    <div className={styles.artContainer} style={{ overflow: 'hidden' }}>
        <div className={styles.gridPlane} />
        <div className={styles.gridOverlay} />
    </div>
);

const ArtFlux = () => (
    <div className={styles.artContainer}>
        <div className={`${styles.fluxBlob} ${styles.blob1}`} />
        <div className={`${styles.fluxBlob} ${styles.blob2}`} />
        <div className={`${styles.fluxBlob} ${styles.blob3}`} />
    </div>
);

const ArtReactor = () => (
    <div className={styles.artContainer}>
        <div className={styles.reactorRing} />
        <div className={styles.reactorCore} />
        <div className={styles.reactorScanner} />
    </div>
);

const ArtShield = () => (
    <div className={styles.artContainer}>
        {/* Validation/Security Art */}
        <div style={{
            position: 'absolute', width: '140px', height: '180px',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'pulse 3s infinite'
        }} />
        <div style={{
            position: 'absolute', width: '100px', height: '140px',
            background: 'rgba(212, 175, 55, 0.1)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'pulse 3s infinite reverse'
        }} />
        <div className={styles.spotlight} style={{ opacity: 0.5 }} />
    </div>
);

const ArtAscent = () => (
    <div className={styles.artContainer}>
        <div className={`${styles.ascentBar} ${styles.bar1}`} />
        <div className={`${styles.ascentBar} ${styles.bar2}`} />
        <div className={`${styles.ascentBar} ${styles.bar3}`} />
        <div className={`${styles.ascentBar} ${styles.bar4}`} />
    </div>
);

const ArtRenderer = ({ type }: { type: string }) => {
    switch(type) {
        case 'Lens': return <ArtLens />;
        case 'Matrix': return <ArtMatrix />;
        case 'Flux': return <ArtFlux />;
        case 'Reactor': return <ArtReactor />;
        case 'Shield': return <ArtShield />;
        case 'Ascent': return <ArtAscent />;
        default: return null;
    }
}

const Card = ({ i, step, progress, range, targetScale }: { i: number, step: any, progress: MotionValue<number>, range: number[], targetScale: number }) => {
    const { theme } = useTheme();
    
    const scale = useTransform(progress, range, [1, targetScale]);
    
    // Theme-aware brightness: Dark mode fades to dark, Light mode stays mostly bright
    const brightnessEnd = theme === 'light' ? "brightness(100%)" : "brightness(40%)";
    const filter = useTransform(progress, range, ["brightness(100%)", brightnessEnd]);
    
    // Check if mobile for reduced stacking offset
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const stackOffset = isMobile ? 13 : 40;
    
    // Mouse tracking for spotlight
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        const mouseX = clientX - left;
        const mouseY = clientY - top;
        currentTarget.style.setProperty('--mouse-x', `${mouseX}px`);
        currentTarget.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    return (
        <div className={styles.cardWrapper} style={{ top: isMobile ? `calc(12vh + ${i * stackOffset}px)` : `calc(20vh + ${i * stackOffset}px)` }}>
             {/* Note: Stacking starts at 12vh on mobile, 20vh on desktop */}
            <motion.div 
                className={styles.card}
                style={{ scale, filter }}
                onMouseMove={handleMouseMove}
            >
                <div className={styles.spotlight} />
                
                <div className={styles.imageSide}>
                    <ArtRenderer type={step.art} />
                </div>

                <div className={styles.contentSide}>
                    <span className={styles.hugeNumber}>{step.step}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardDesc}>{step.desc}</p>
                </div>
            </motion.div>
        </div>
    )
}

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section className={styles.section} ref={containerRef}>
        <div className={styles.header}>
            <span className={styles.label}>Methodology</span>
            <h2 className={styles.mainTitle}>The Process</h2>
        </div>

        <div className={styles.cardsContainer}>
            {steps.map((step, i) => {
                const targetScale = 1 - ( (steps.length - i) * 0.05);
                return (
                    <Card 
                        key={i} 
                        i={i} 
                        step={step} 
                        progress={scrollYProgress} 
                        range={[i * 0.25, 1]}
                        targetScale={targetScale} 
                    />
                );
            })}
        </div>
    </section>
  );
}
