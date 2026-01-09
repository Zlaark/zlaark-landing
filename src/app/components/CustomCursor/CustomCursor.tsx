'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Independent springs for dot (fast) and ring (fluid)
  const dotSpringConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const ringSpringConfig = { damping: 20, stiffness: 100, mass: 0.8 }; // More drag/lag
  
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // JS Touch detection removed - relying on CSS @media (hover: none)
    // This allows hybrid devices (laptops with touchscreens) to still use the custom cursor with a mouse

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], input, textarea');
      
      if (interactive) {
        setIsHovering(true);
        const el = interactive as HTMLElement;
        const text = el.getAttribute('data-cursor');
        if (text) setCursorText(text);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Delegation for better performance with React/Next.js
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', (e) => {
        // Only clear if moving to non-interactive
        const target = e.relatedTarget as HTMLElement;
        if (!target || !target.closest('a, button, [data-cursor], input, textarea')) {
            handleMouseLeave();
        }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isHidden) return null;

  return (
    <>
      {/* Main Cursor Dot - Fast & Sharp */}
      <motion.div
        className={styles.cursorDot}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 0 : 1, // Shrink to 0 on hover
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Cursor Ring - Fluid & Expressive */}
      <motion.div
        className={styles.cursorRing}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1, // Expand less for cleaner feel
          width: isHovering && cursorText ? 100 : 40, // Pill shape for text
          height: isHovering && cursorText ? 40 : 40,
          borderRadius: isHovering && cursorText ? 20 : '50%',
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.9)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'rgba(212, 175, 55, 0)' : 'rgba(255, 255, 255, 0.5)',
          mixBlendMode: isHovering ? 'normal' : 'difference', // Gold is normal, white wireframe is difference
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <AnimatePresence mode='wait'>
          {cursorText && isHovering && (
            <motion.span
              className={styles.cursorText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={cursorText}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
