'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const [time, setTime] = useState("");

    // Magnetic Button Logic
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const x = (clientX - centerX) * 0.3; // Magnet strength
        const y = (clientY - centerY) * 0.3;

        setPosition({ x, y });
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    }

    useEffect(() => {
        // Update Time
        const interval = setInterval(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.bgGradient} />

            <div className={styles.contentWrapper}>

                {/* HERO CTA */}
                <div className={styles.ctaSection}>
                    <span className={styles.ctaLabel}>Have an Idea?</span>

                    <motion.h1
                        className={styles.giantText}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        LET'S TALK
                    </motion.h1>

                    <motion.div
                        className={styles.buttonWrapper}
                        animate={{ x: position.x, y: position.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                        <a
                            href="mailto:hello@zlaark.com"
                            className={styles.magButton}
                            ref={buttonRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            Email Me
                        </a>
                    </motion.div>
                </div>

                {/* BOTTOM NAV */}
                <div className={styles.bottomNav}>
                    <div className={styles.col}>
                        <h4>Socials</h4>
                        <div className={styles.linkList}>
                            <a href="https://www.linkedin.com/company/zlaark" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn</a>
                            <a href="https://www.instagram.com/zlaark/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
                            <a href="https://chat.whatsapp.com/IZ0s8MwAJ1v3SQWn77A6PT" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Community</a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4>Navigation</h4>
                        <div className={styles.linkList}>
                            <a href="#home" className={styles.footerLink}>Home</a>
                            <a href="#work" className={styles.footerLink}>Work</a>
                            <a href="#about" className={styles.footerLink}>Agency</a>
                            <a href="#contact" className={styles.footerLink}>Contact</a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4>Local Time</h4>
                        <div className={styles.timeLocation}>
                            {time || "Loading..."}<br />
                            Amritsar, India<br />
                            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>31.6340° N, 74.8723° E</span>
                        </div>
                    </div>

                    <div className={styles.copyRow}>
                        <span>© 2025 Zlaark Agency</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
