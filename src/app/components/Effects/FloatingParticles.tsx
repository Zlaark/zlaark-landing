'use client';

import { motion } from 'framer-motion';
import styles from './FloatingParticles.module.css';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

export default function FloatingParticles({ count = 30, color = 'rgba(212, 175, 55, 0.3)' }: FloatingParticlesProps) {
  return (
    <div className={styles.container}>
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className={styles.particle}
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              top: `${startY}%`,
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            animate={{
              y: [0, -100, -200, -100, 0],
              x: [0, 30, -20, 40, 0],
              opacity: [0, 1, 0.8, 0.6, 0],
              scale: [0.5, 1, 0.8, 1.2, 0.5],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
