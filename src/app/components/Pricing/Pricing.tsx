'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import styles from './Pricing.module.css';

const tiers = [
    {
        id: 'web',
        name: "Brand & Web",
        desc: "High-performance marketing sites and immersive portals.",
        features: ["WordPress / Next.js", "Framer Motion Interactions", "CMS Integration", "SEO & Analytics Setup"]
    },
    {
        id: 'commerce',
        name: "E-Commerce",
        desc: "Scalable storefronts designed for maximum conversion.",
        features: ["Shopify / WooCommerce", "Custom Checkout Logic", "Inventory Management", "High-Load Optimization"]
    },
    {
        id: 'product',
        name: "Product & App",
        desc: "Native mobile apps and complex SaaS platforms.",
        features: ["React Native / Expo (iOS + Android)", "Web App Development", "Real-time Database", "User Auth & Security"]
    }
];

const Card = ({ tier, index }: { tier: any, index: number }) => {
    const { theme } = useTheme();
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });
    
    // Foil Effect
    const mouseXRatio = useTransform(x, [-0.5, 0.5], [0, 100]);
    const mouseYRatio = useTransform(y, [-0.5, 0.5], [0, 100]);
    
    // Theme-aware shine color
    const shineColor = theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)';
    
    const bgGradient = useTransform(
        [mouseXRatio, mouseYRatio],
        ([mx, my]) => `radial-gradient(circle at ${mx}% ${my}%, ${shineColor}, transparent 50%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className={styles.cardWrapper}>
            <motion.div 
                className={styles.card}
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Holographic Foil Layer */}
                <motion.div 
                    className={styles.foilLayer} 
                    style={{ background: bgGradient }}
                />

                {/* Content */}
                <div className={styles.cardInner}>
                    <div className={styles.contentSpace}>
                        <h3 className={styles.tierName}>{tier.name}</h3>
                        <p className={styles.tierDesc}>{tier.desc}</p>
                    </div>
                    
                    <ul className={styles.featureList}>
                        {tier.features.map((f: string, k: number) => (
                            <li key={k}>
                                <Check size={16} /> 
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: 'auto' }}>
                        {/* Removed Price Display */}
                        <div style={{ height: '1rem' }} />
                        <Link href="/book" className={styles.cardButton}>
                            <span>Schedule Consultation</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Pricing() {
    return (
        <section className={styles.section} id="pricing">
            <div className={styles.header}>
                <span className={styles.label}>Investment</span>
                <h2 className={styles.title}>Engagement Models</h2>
            </div>
            
            <div className={styles.grid}>
                {tiers.map((tier, i) => (
                    <Card key={i} tier={tier} index={i} />
                ))}
            </div>
        </section>
    );
}
