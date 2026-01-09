'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CreativeTeam.module.css';

const team = [
  {
    id: 1,
    name: 'Kanishk Sharma',
    role: 'Founder & Creative Director',
    initial: 'KS',
    bio: 'Obsessed with the intersection of design and technology.',
    accent: '#d4af37' // Gold
  },
  {
    id: 2,
    name: 'Design Lead',
    role: 'Senior UI/UX Designer',
    initial: 'DL',
    bio: 'Crafting experiences that feel inevitable.',
    accent: '#4a9eff' // Blue
  },
  {
    id: 3,
    name: 'Tech Lead',
    role: 'Principal Engineer',
    initial: 'TL',
    bio: 'Building systems that scale to infinity.',
    accent: '#a855f7' // Purple
  }
];

export default function CreativeTeam() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.span 
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Team
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The Architects Behind<br />
          <span className={styles.highlight}>The Vision</span>
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            onHoverStart={() => setHoveredId(member.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{ y: -10 }}
          >
            {/* Avatar Circle */}
            <motion.div 
              className={styles.avatar}
              style={{ 
                borderColor: hoveredId === member.id ? member.accent : 'var(--border-color)'
              }}
              animate={{
                boxShadow: hoveredId === member.id 
                  ? `0 0 40px ${member.accent}40` 
                  : '0 0 0px transparent'
              }}
            >
              <span 
                className={styles.initial}
                style={{ color: hoveredId === member.id ? member.accent : 'var(--text-muted)' }}
              >
                {member.initial}
              </span>
              
              {/* Orbital ring animation */}
              <motion.div 
                className={styles.orbit}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ borderColor: member.accent }}
              />
            </motion.div>

            {/* Info */}
            <h3 className={styles.name}>{member.name}</h3>
            <span className={styles.role} style={{ color: member.accent }}>
              {member.role}
            </span>

            {/* Bio reveal on hover */}
            <AnimatePresence>
              {hoveredId === member.id && (
                <motion.p
                  className={styles.bio}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  "{member.bio}"
                </motion.p>
              )}
            </AnimatePresence>

            {/* Bottom accent line */}
            <motion.div 
              className={styles.accentLine}
              style={{ backgroundColor: member.accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredId === member.id ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
