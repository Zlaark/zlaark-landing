'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Target, Zap, Users } from 'lucide-react';
import styles from './ScatterSnapValues.module.css';

const values = [
  {
    id: 1,
    title: "Craft Over Convention",
    desc: "We reject templates. Every pixel is intentional.",
    icon: <Sparkles strokeWidth={1} size={28} />,
    // Chaotic starting position (random offsets)
    chaos: { x: -120, y: 80, rotate: -15, scale: 0.9 }
  },
  {
    id: 2,
    title: "Results-Driven",
    desc: "Beautiful design with measurable impact.",
    icon: <Target strokeWidth={1} size={28} />,
    chaos: { x: 150, y: -60, rotate: 12, scale: 1.1 }
  },
  {
    id: 3,
    title: "Relentless Innovation",
    desc: "Cutting-edge tech before it's mainstream.",
    icon: <Zap strokeWidth={1} size={28} />,
    chaos: { x: -80, y: -100, rotate: 8, scale: 0.85 }
  },
  {
    id: 4,
    title: "Radical Transparency",
    desc: "No hidden fees. Clear communication.",
    icon: <Users strokeWidth={1} size={28} />,
    chaos: { x: 100, y: 120, rotate: -20, scale: 1.05 }
  }
];

export default function ScatterSnapValues() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.header}>
        <motion.span 
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Principles
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          From Chaos,<br />
          <span className={styles.highlight}>Order Emerges</span>
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Watch our core values snap into place.
        </motion.p>
      </div>

      <div className={styles.grid}>
        {values.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.card}
            initial={{
              x: item.chaos.x,
              y: item.chaos.y,
              rotate: item.chaos.rotate,
              scale: item.chaos.scale,
              opacity: 0.3,
              filter: 'blur(4px)'
            }}
            animate={isInView ? {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)'
            } : {}}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: i * 0.15 + 0.4 // Stagger the snap
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
            }}
          >
            {/* Connecting line effect */}
            <div className={styles.connector} />
            
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
            
            {/* Corner accent */}
            <div className={styles.cornerAccent} />
          </motion.div>
        ))}
      </div>

      {/* Decorative connecting lines */}
      <svg className={styles.lines} viewBox="0 0 600 400" preserveAspectRatio="none">
        <motion.path
          d="M 150 100 Q 300 50 450 100 T 150 300 Q 300 350 450 300"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
    </section>
  );
}
