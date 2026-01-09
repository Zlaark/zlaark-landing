'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import styles from './Preloader.module.css';

const words = ['VISION', 'DESIGN', 'IMPACT', 'ZLAARK'];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [phase, setPhase] = useState<'words' | 'reveal' | 'exit'>('words');
  const [displayValue, setDisplayValue] = useState(0);
  const progress = useMotionValue(0);
  const progressScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    // Check if we've already shown the loader this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      onComplete(); // Skip immediately
      return;
    }

    // Otherwise, mark as seen and proceed with animation
    sessionStorage.setItem('hasSeenLoader', 'true');

    // Animate progress from 0 to 100
    const controls = animate(progress, 100, {
      duration: 3.5, // Slightly faster
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
      onComplete: () => {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 800);
      }
    });

    return () => controls.stop();
  }, [progress, onComplete]);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Cycle through words quickly
    if (phase === 'words' && currentWordIndex < words.length - 1) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
      }, 500); 
      return () => clearInterval(interval);
    }
  }, [phase, currentWordIndex]);

  useEffect(() => {
    if (phase === 'exit') {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [phase, onComplete]);

  // Determine colors based on theme
  const isLight = theme === 'light';
  const bgColor = isLight ? '#f5f5f5' : '#000000';
  const textColor = isLight ? '#000000' : '#ffffff';
  const accentColor = '#d4af37'; // Gold is constant

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'exit' && (
        <motion.div
          className={styles.preloader}
          style={{ background: bgColor }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Animated Background Lines */}
          <div className={styles.linesContainer}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.line}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 0.2, 0.2, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
                style={{ 
                  top: `${(i + 1) * 9}%`,
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
                }}
              />
            ))}
          </div>

          {/* Central Content */}
          <div className={styles.content}>
            {/* Morphing Word Display */}
            <div className={styles.wordContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  className={styles.word}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4 }}
                >
                  <span className={styles.wordText} style={{ color: textColor }}>
                    {words[currentWordIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressWrapper}>
              <div className={styles.progressTrack} style={{ background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}>
                <motion.div 
                  className={styles.progressFill}
                  style={{ scaleX: progressScale, background: accentColor }}
                />
              </div>
              
              <div className={styles.progressText}>
                <span className={styles.progressNumber} style={{ color: textColor }}>
                  {displayValue}
                </span>
                <span className={styles.progressPercent} style={{ color: isLight ? '#666' : '#888' }}>%</span>
              </div>
            </div>
          </div>

          {/* Reveal Mask */}
          {phase === 'reveal' && (
            <>
              <motion.div 
                className={styles.revealMask}
                style={{ left: 0, background: bgColor }}
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div 
                className={styles.revealMask}
                style={{ right: 0, background: bgColor }}
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
