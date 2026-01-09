'use client';

import { useScroll, useTransform, useVelocity, useSpring, motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Wraps content in a motion div that skews based on scroll velocity.
 */
export const VelocitySkew = ({ children, className }: { children: ReactNode, className?: string }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Skew ranges from -5deg to 5deg depending on speed
  const skewY = useTransform(smoothVelocity, [-2000, 2000], [-5, 5]);

  return (
    <motion.div style={{ skewY }} className={className}>
      {children}
    </motion.div>
  );
};
