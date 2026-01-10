'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';
import FogSpotlight from '../Three/FogSpotlight';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <FogSpotlight />

      <div className={styles.nav}>
        <Image
          src="/logo.png"
          alt="Zlaark"
          width={100}
          height={28}
          className={styles.logo}
        />
        <span>Est. MMXXV</span>
      </div>

      <div className={styles.contentWrapper}>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          We Craft <br />
          <span className={styles.italic}>digital</span> Legacies
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Strategy • Design • Motion
        </motion.p>
      </div>
    </section>
  );
}
