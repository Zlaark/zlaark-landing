'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CreativeLoader from '../Preloader/CreativeLoader';


export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  // Warp Drive Physics removed to fix position: sticky
  // const { scrollY } = useScroll();
  // const scrollVelocity = useVelocity(scrollY);
  // ...

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <CreativeLoader onComplete={handlePreloaderComplete} />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 40 }} // Start lower for more dramatic lift
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ 
              duration: 0.8, // Slower, expensive feel 
              ease: [0.22, 1, 0.36, 1] 
            }}
            style={{ width: '100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
