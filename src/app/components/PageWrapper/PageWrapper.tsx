'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CreativeLoader from '../Preloader/CreativeLoader';


export default function PageWrapper({ children }: { children: React.ReactNode }) {
  // Check session flag immediately to avoid flash
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('zlaark_genesis_loader');
    }
    return true;
  });
  
  const pathname = usePathname();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Only render loader if actually loading */}
      {isLoading && <CreativeLoader onComplete={handlePreloaderComplete} />}

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
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
