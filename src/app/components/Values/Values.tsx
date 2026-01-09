'use client';

import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Users } from 'lucide-react';
import styles from './Values.module.css';

const values = [
  {
    id: 1,
    title: "Craft Over Convention",
    desc: "We reject templates and cookie-cutter solutions. Earning attention requires breaking the mold.",
    icon: <Sparkles strokeWidth={1} size={32} />,
    number: "01",
  },
  {
    id: 2,
    title: "Results-Driven",
    desc: "Beautiful design means nothing without performance. We are obsessed impact and conversion.",
    icon: <Target strokeWidth={1} size={32} />,
    number: "02",
  },
  {
    id: 3,
    title: "Relentless Innovation",
    desc: "We stay ahead of the curve, adopting cutting-edge technologies before they become mainstream.",
    icon: <Zap strokeWidth={1} size={32} />,
    number: "03",
  },
  {
    id: 4,
    title: "Radical Transparency",
    desc: "No hidden fees, no jargon. We build partnerships based on honesty and clear communication.",
    icon: <Users strokeWidth={1} size={32} />,
    number: "04",
  }
];

export default function Values() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>Our Principles</span>
        <h2 className={styles.title}>
          Built on <span style={{ color: 'var(--accent-color)' }}>Trust</span> & <span style={{ color: 'var(--accent-color)' }}>Innovation</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {values.map((item, i) => (
          <motion.div 
            key={item.id}
            className={styles.gridCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{item.number}</span>
                <div className={styles.iconWrapper}>{item.icon}</div>
            </div>
            <h3 className={styles.gridTitle}>{item.title}</h3>
            <p className={styles.gridDesc}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
