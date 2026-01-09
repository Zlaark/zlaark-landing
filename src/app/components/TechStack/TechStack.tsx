'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import DistortedGrid from '../Three/DistortedGrid';
import styles from './TechStack.module.css';

const stack = [
  { 
    category: "Frontend", 
    icon: "◇",
    items: ["Next.js", "React", "TypeScript", "Framer Motion"],
    accent: "#00d4ff"
  },
  { 
    category: "Mobile", 
    icon: "◈",
    items: ["React Native", "Expo", "iOS", "Android"],
    accent: "#a855f7"
  },
  { 
    category: "CMS & Web", 
    icon: "◆",
    items: ["WordPress", "Sanity", "Strapi", "Contentful"],
    accent: "#22c55e"
  },
  { 
    category: "Commerce", 
    icon: "◇",
    items: ["Shopify Plus", "WooCommerce", "Stripe", "Razorpay"],
    accent: "#f59e0b"
  },
  { 
    category: "Cloud & DB", 
    icon: "◈",
    items: ["AWS", "Vercel", "Supabase", "MongoDB"],
    accent: "#ef4444"
  }
];

const TechCard = ({ group, index }: { group: typeof stack[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--accent': group.accent } as React.CSSProperties}
    >
      {/* Glow Effect */}
      <motion.div 
        className={styles.glow}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card Content */}
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{group.icon}</span>
        <h3 className={styles.categoryTitle}>{group.category}</h3>
      </div>
      
      <ul className={styles.list}>
        {group.items.map((item, j) => (
          <motion.li 
            key={j} 
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + j * 0.05 }}
            viewport={{ once: true }}
          >
            <span className={styles.bullet} />
            {item}
          </motion.li>
        ))}
      </ul>
      
      {/* Hover Line */}
      <motion.div 
        className={styles.hoverLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section className={styles.section} id="arsenal">
      {/* 3D Background */}
      <DistortedGrid />
      <div className={styles.bgGradient} />
      
      <div className={styles.content}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Under The Hood</span>
          <h2 className={styles.title}>The Arsenal</h2>
          <p className={styles.subtitle}>
            Enterprise-grade technologies powering award-winning digital experiences
          </p>
        </motion.div>

        <div className={styles.grid}>
          {stack.map((group, i) => (
            <TechCard key={i} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
