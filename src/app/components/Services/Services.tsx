'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LayoutGrid, Monitor, ShoppingBag, Cpu } from 'lucide-react';
import FloatingParticles from '../Effects/FloatingParticles';
import styles from './Services.module.css';

const services = [
  {
    id: 0,
    title: "Strategy",
    desc: "Market Analysis • Brand Position",
    icon: <LayoutGrid size={32} />,
    theme: styles.themeRed
  },
  {
    id: 1,
    title: "Experience",
    desc: "WebGL • 3D Interaction",
    icon: <Monitor size={32} />,
    theme: styles.themeCyan
  },
  {
    id: 2,
    title: "Commerce",
    desc: "Shopify Plus • Headless",
    icon: <ShoppingBag size={32} />,
    theme: styles.themeGold
  },
  {
    id: 3,
    title: "Systems",
    desc: "Mobile Apps • Cloud Arch",
    icon: <Cpu size={32} />,
    theme: styles.themePurple
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position as % (0-100)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform into CSS % values
  const widthLeft = useTransform(smoothX, (v) => `${v}%`);
  const widthRight = useTransform(smoothX, (v) => `${100 - v}%`);
  const heightTop = useTransform(smoothY, (v) => `${v}%`);
  const heightBottom = useTransform(smoothY, (v) => `${100 - v}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp to avoid hiding content (30% min width/height)
    const clampedX = Math.min(Math.max(x, 30), 70);
    const clampedY = Math.min(Math.max(y, 30), 70);

    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <section className={styles.section} id="services">
      {/* Background Effects */}
      <FloatingParticles count={15} color="rgba(255, 255, 255, 0.1)" />
      
      <div className={styles.sectionHeader}>
        <span className={styles.label}>Our Expertise</span>
        <h2 className={styles.sectionTitle}>Holistic Digital<br />Transformation</h2>
      </div>

      <div 
        className={styles.gridContainer} 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Row */}
        <motion.div className={styles.row} style={{ height: heightTop }}>
            {/* Cell 0 (Top Left) */}
            <motion.div className={`${styles.cell} ${services[0].theme}`} style={{ width: widthLeft }}>
                <div className={styles.texture} />
                <div className={styles.cellInner}>
                    <div className={styles.header}>
                        <span className={styles.index}>01</span>
                        <div className={styles.icon}>{services[0].icon}</div>
                    </div>
                    <div className={styles.footer}>
                        <h2 className={styles.title}>{services[0].title}</h2>
                        <p className={styles.desc}>{services[0].desc}</p>
                    </div>
                </div>
            </motion.div>
            
            {/* Cell 1 (Top Right) */}
            <motion.div className={`${styles.cell} ${services[1].theme}`} style={{ width: widthRight }}>
                <div className={styles.texture} />
                <div className={styles.cellInner}>
                    <div className={styles.header}>
                        <span className={styles.index}>02</span>
                        <div className={styles.icon}>{services[1].icon}</div>
                    </div>
                    <div className={styles.footer}>
                        <h2 className={styles.title}>{services[1].title}</h2>
                        <p className={styles.desc}>{services[1].desc}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className={styles.row} style={{ height: heightBottom }}>
            {/* Cell 2 (Bottom Left) */}
            <motion.div className={`${styles.cell} ${services[2].theme}`} style={{ width: widthLeft }}>
                <div className={styles.texture} />
                <div className={styles.cellInner}>
                    <div className={styles.header}>
                        <span className={styles.index}>03</span>
                        <div className={styles.icon}>{services[2].icon}</div>
                    </div>
                    <div className={styles.footer}>
                        <h2 className={styles.title}>{services[2].title}</h2>
                        <p className={styles.desc}>{services[2].desc}</p>
                    </div>
                </div>
            </motion.div>
            
            {/* Cell 3 (Bottom Right) */}
            <motion.div className={`${styles.cell} ${services[3].theme}`} style={{ width: widthRight }}>
                <div className={styles.texture} />
                <div className={styles.cellInner}>
                    <div className={styles.header}>
                        <span className={styles.index}>04</span>
                        <div className={styles.icon}>{services[3].icon}</div>
                    </div>
                    <div className={styles.footer}>
                        <h2 className={styles.title}>{services[3].title}</h2>
                        <p className={styles.desc}>{services[3].desc}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* Crosshair Overlay */}
        <motion.div 
            className={styles.crosshair}
            style={{ 
                left: widthLeft,
                top: heightTop
            }}
        >
            <div className={styles.crosshairCenter} />
        </motion.div>

      </div>
    </section>
  );
}
