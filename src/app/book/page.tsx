'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Book.module.css';

export default function BookPage() {
  return (
    <div className={styles.main}>
        <Link href="/" className={styles.backLink}>← Return Home</Link>
        <div className={styles.glow} />
        
        <motion.div 
            className={styles.container}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className={styles.header}>
                <span className={styles.label}>Start the Dialogue</span>
                <h1 className={styles.title}>Secure Your Session</h1>
                <p style={{ color: '#666', marginTop: '1rem', lineHeight: '1.6' }}>
                    We only take on 3 projects at a time to ensure undivided attention. 
                    Tell us about your mission.
                </p>
            </div>

            <form className={styles.form}>
                <div className={styles.group}>
                    <label className={styles.inputLabel}>Name</label>
                    <input type="text" className={styles.input} placeholder="John Doe" />
                </div>
                
                <div className={styles.group}>
                    <label className={styles.inputLabel}>Email</label>
                    <input type="email" className={styles.input} placeholder="john@company.com" />
                </div>

                <div className={styles.group}>
                    <label className={styles.inputLabel}>Interest</label>
                    <select className={styles.select}>
                        <option>Brand & Web Presence</option>
                        <option>E-Commerce Ecosystem</option>
                        <option>Product / App Development</option>
                        <option>Other / Custom Strategy</option>
                    </select>
                </div>
                
                <div className={styles.group}>
                    <label className={styles.inputLabel}>Budget Range</label>
                    <select className={styles.select}>
                        <option>$500 - $2k</option>
                        <option>$2k - $8k</option>
                        <option>$8k - $20k</option>
                        <option>$20k+</option>
                    </select>
                </div>

                <div className={styles.group}>
                    <label className={styles.inputLabel}>The Vision</label>
                    <textarea className={styles.textarea} placeholder="Tell us about the project..." />
                </div>

                <button className={styles.submitBtn}>
                    Request Strategy Session
                </button>
            </form>
        </motion.div>
    </div>
  );
}
