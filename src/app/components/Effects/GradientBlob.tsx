'use client';

import { motion } from 'framer-motion';
import styles from './GradientBlob.module.css';

interface GradientBlobProps {
  color1?: string;
  color2?: string;
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export default function GradientBlob({ 
  color1 = 'rgba(212, 175, 55, 0.1)', 
  color2 = 'rgba(139, 69, 19, 0.05)',
  size = 600,
  position = 'top-right'
}: GradientBlobProps) {
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '-20%', left: '-20%' },
    'top-right': { top: '-20%', right: '-20%' },
    'bottom-left': { bottom: '-20%', left: '-20%' },
    'bottom-right': { bottom: '-20%', right: '-20%' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  return (
    <motion.div
      className={styles.blob}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
        ...positionStyles[position],
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
