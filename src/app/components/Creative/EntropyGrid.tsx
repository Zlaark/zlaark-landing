'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EntropyGrid.module.css';

interface Item {
  id: string;
  content: React.ReactNode;
}

export default function EntropyGrid({ items }: { items: Item[] }) {
  const constraintsRef = useRef(null);
  const [isOrdered, setIsOrdered] = useState(false);

  return (
    <div className={styles.container}>
      <button 
        className={styles.toggleBtn}
        onClick={() => setIsOrdered(!isOrdered)}
      >
        {isOrdered ? 'The Entropy' : 'The Order'}
      </button>

      <motion.div ref={constraintsRef} className={styles.canvas}>
        {items.map((item, i) => {
          // Random scattering
          const randomX = Math.random() * 40 - 20; 
          const randomY = Math.random() * 40 - 20;
          const randomRotate = Math.random() * 30 - 15;

          return (
            <motion.div
              key={item.id}
              className={styles.card}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, cursor: 'grabbing', rotateX: 10, rotateY: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              whileHover={{ scale: 1.05, cursor: 'grab', rotate: 0 }}
              animate={isOrdered ? {
                x: 0,
                y: 0,
                rotate: 0,
                zIndex: 1,
                scale: 1,
              } : {
                x: randomX * 10,
                y: randomY * 10,
                rotate: randomRotate,
                zIndex: i,
                scale: 1,
              }}
              style={{ perspective: 1000 }} // Enable 3D space
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {item.content}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
