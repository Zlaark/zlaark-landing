'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CreativeLoader.module.css';

const DECODE_TEXT = "INITIALIZING REALITY";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function CreativeLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'line' | 'logo' | 'decode' | 'exit'>('line');
  const [decodedText, setDecodedText] = useState("");
  const [showDirect, setShowDirect] = useState(false);

  useEffect(() => {
    // Session Check - Skip loader if user has already seen it in this session
    const hasSeen = sessionStorage.getItem('zlaark_genesis_loader');
    if (hasSeen) {
      // Immediately complete without showing loader
      onComplete();
      return;
    }
    
    sessionStorage.setItem('zlaark_genesis_loader', 'true');

    // Sequence Timing - Only runs on first visit
    const lineTimer = setTimeout(() => setPhase('logo'), 1000);
    const decodeTimer = setTimeout(() => setPhase('decode'), 2000);
    const exitTimer = setTimeout(() => setPhase('exit'), 4000);
    const completeTimer = setTimeout(onComplete, 5000);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(decodeTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    }
  }, [onComplete]);

  // Matrix/Cypher Text Effect
  useEffect(() => {
    if (phase !== 'decode') return;
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDecodedText(DECODE_TEXT.split("")
        .map((letter, index) => {
          if (index < iterations) return letter;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("")
      );
      
      if (iterations >= DECODE_TEXT.length) clearInterval(interval);
      iterations += 1/2; // Speed of decode
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  if (showDirect) return null;

  return (
    <AnimatePresence>
        <motion.div className={styles.loaderContainer}>
            
          {/* CURTAINS (For cleanup/exit) */}
          <motion.div 
             className={`${styles.curtain} ${styles.curtainLeft}`}
             initial={{ x: 0 }}
             animate={phase === 'exit' ? { x: '-100%' } : { x: 0 }}
             transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
          />
          <motion.div 
             className={`${styles.curtain} ${styles.curtainRight}`}
             initial={{ x: 0 }}
             animate={phase === 'exit' ? { x: '100%' } : { x: 0 }}
             transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
          />

          {/* CONTENT LAYER */}
          <motion.div 
            className={styles.content}
            animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
             {/* 1. THE SPARK (Line) */}
             <svg className={styles.svgLine} viewBox="0 0 100 2">
                <motion.line 
                  x1="0" y1="1" x2="100" y2="1" 
                  className={styles.goldLine}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: phase === 'line' ? 1 : 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
             </svg>

             {/* 2. THE CONSTRUCT (Logo) */}
             {phase !== 'line' && (
               <motion.div 
                 className={styles.logoWrapper}
                 initial={{ opacity: 0, scale: 0.8, letterSpacing: '0em' }}
                 animate={{ opacity: 1, scale: 1, letterSpacing: '0.5em' }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
               >
                 <span className={styles.logo}>ZLAARK</span>
               </motion.div>
             )}

             {/* 3. DECODING TEXT */}
             {phase === 'decode' || phase === 'exit' ? (
                <div className={styles.terminalText}>
                   {decodedText}
                </div>
             ) : null}

          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
