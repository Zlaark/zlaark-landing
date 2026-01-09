'use client';

import styles from './Clients.module.css';

const logos = [
  "Microsoft", "Netflix", "Uber", "Spotify", "Nike", "Apple", "Google", "Amazon", "Tesla", "Airbnb"
];

export default function Clients() {
  return (
    <section className={styles.section}>
      <div className={styles.label}>Trusted By Industry Leaders</div>
      
      <div className={styles.marquee}>
        <div className={styles.track}>
          {/* Double the list for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className={styles.logoItem}>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
