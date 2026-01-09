'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <>
      {/* Eclipse Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className={styles.eclipseOverlay}
            initial={{ 
              clipPath: 'circle(0% at calc(100% - 3rem) calc(100% - 3rem))',
              opacity: 1
            }}
            animate={{ 
              clipPath: 'circle(150% at calc(100% - 3rem) calc(100% - 3rem))',
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              clipPath: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 1.2, times: [0, 0.7, 1] }
            }}
          >
            {/* Inner glow ring */}
            <motion.div 
              className={styles.eclipseGlow}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 3],
                opacity: [0, 0.8, 0]
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            
            {/* Corona rays */}
            <div className={styles.coronaContainer}>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.coronaRay}
                  style={{ 
                    rotate: `${i * 30}deg`,
                    transformOrigin: 'center center'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: [0, 1.5, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.02,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        className={styles.toggleButton}
        onClick={toggleTheme}
        disabled={isTransitioning}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div className={styles.iconContainer}>
          {/* Sun Icon */}
          <motion.svg
            className={styles.sunIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ x: "-50%", y: "-50%" }}
            animate={{
              x: "-50%",
              y: "-50%",
              scale: theme === 'light' ? 1 : 0,
              rotate: theme === 'light' ? 0 : -90,
              opacity: theme === 'light' ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </motion.svg>

          {/* Moon Icon */}
          <motion.svg
            className={styles.moonIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ x: "-50%", y: "-50%" }}
            animate={{
              x: "-50%",
              y: "-50%",
              scale: theme === 'dark' ? 1 : 0,
              rotate: theme === 'dark' ? 0 : 90,
              opacity: theme === 'dark' ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        </div>
        
        {/* Orbiting particle */}
        <motion.span 
          className={styles.orbitingDot}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
      </motion.button>
    </>
  );
}
