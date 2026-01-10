'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import FloatingParticles from '../Effects/FloatingParticles';
import GradientBlob from '../Effects/GradientBlob';
import { useTheme } from '../../context/ThemeContext';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "Highly recommend Zlaark — fast delivery, excellent quality, clear communication, and great value. My go-to team for future web projects.",
    author: "Raja Arsalaan",
    role: "CEO, SW Build"
  },
  {
    text: "Shoutout to Zlaark Amazing work, fast delivery, and great attention to detail. Highly recommended!",
    author: "Shiv Pratap Singh Dangi",
    role: "Founder, Sourcing Screen"
  },
  {
    text: "I highly recommend Zlaark for their professionalism, quality work, and reliable delivery. A great development partner.",
    author: "Sai Kiran",
    role: "Founder, GESSURE"
  }
];

export default function Testimonials() {
  const { theme } = useTheme();
  
  // Theme-aware colors: Stronger opacity in light mode to be visible on white
  const particleColor = theme === 'light' ? "rgba(212, 175, 55, 0.6)" : "rgba(212, 175, 55, 0.2)";
  const blobColor1 = theme === 'light' ? "rgba(212, 175, 55, 0.2)" : "rgba(212, 175, 55, 0.08)";
  const blobColor2 = theme === 'light' ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.05)";

  return (
    <section className={styles.section}>
      {/* Background Effects */}
      <FloatingParticles count={20} color={particleColor} />
      <GradientBlob position="top-left" color1={blobColor1} size={500} />
      <GradientBlob position="bottom-right" color1={blobColor2} size={400} />
      
      <div className={styles.header}>
        <span className={styles.label}>Voices</span>
        <h2 className={styles.title}>Client Stories</h2>
      </div>

      <div className={styles.grid}>
        {reviews.map((review, i) => (
          <motion.div 
            key={i} 
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <Quote className={styles.quoteIcon} size={40} strokeWidth={1} />
            <p className={styles.text}>"{review.text}"</p>
            <div className={styles.authorBlock}>
              <span className={styles.author}>{review.author}</span>
              <span className={styles.role}>{review.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
