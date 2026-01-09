'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Smartphone, ShoppingBag, Layers, Zap } from 'lucide-react';
import FloatingParticles from '../components/Effects/FloatingParticles';
import { useTheme } from '../context/ThemeContext';
import styles from './Services.module.css';

const services = [
  {
    icon: Palette,
    title: 'Brand & Web Design',
    desc: 'Strategic visual identities and immersive web experiences that captivate your audience.',
    features: ['Visual Identity Systems', 'UI/UX Design', 'Motion Design', 'Design Systems'],
    color: '#d4af37',
  },
  {
    icon: Code,
    title: 'Web Development',
    desc: 'High-performance websites built with cutting-edge technologies for speed and scalability.',
    features: ['Next.js / React', 'WordPress / Headless CMS', 'E-Commerce Platforms', 'API Integration'],
    color: '#8b5cf6',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Native and cross-platform apps that deliver seamless experiences on every device.',
    features: ['React Native / Expo', 'iOS & Android', 'App Store Optimization', 'Push Notifications'],
    color: '#06b6d4',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce Solutions',
    desc: 'Conversion-optimized storefronts that turn browsers into buyers.',
    features: ['Shopify / WooCommerce', 'Custom Checkout', 'Payment Integration', 'Inventory Management'],
    color: '#10b981',
  },
  {
    icon: Layers,
    title: 'Product Strategy',
    desc: 'Research-backed strategy that aligns your digital presence with business goals.',
    features: ['Market Research', 'User Personas', 'Competitive Analysis', 'Roadmapping'],
    color: '#f59e0b',
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    desc: 'Optimization that ensures your digital assets load fast and rank high.',
    features: ['Core Web Vitals', 'Technical SEO', 'Analytics Setup', 'Speed Optimization'],
    color: '#ef4444',
  },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We dive deep into your brand, market, and objectives.' },
  { step: '02', title: 'Strategy', desc: 'A tailored roadmap that aligns design with business goals.' },
  { step: '03', title: 'Design', desc: 'Pixel-perfect designs that balance form and function.' },
  { step: '04', title: 'Development', desc: 'Clean, scalable code that brings designs to life.' },
  { step: '05', title: 'Launch', desc: 'Rigorous testing and seamless deployment.' },
  { step: '06', title: 'Optimize', desc: 'Continuous improvement based on real data.' },
];

export default function ServicesPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';

  return (
    <main className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <FloatingParticles count={20} color={particleColor} />
        
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroLabel}>Capabilities</span>
          <h1 className={styles.heroTitle}>Services That Transform</h1>
          <p className={styles.heroSubtitle}>
            End-to-end digital solutions crafted to elevate your brand and drive results.
          </p>
        </motion.div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.serviceIcon} style={{ color: service.color }}>
                <service.icon size={40} strokeWidth={1} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
              <ul className={styles.serviceFeatures}>
                {service.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>How We Work</span>
          <h2 className={styles.sectionTitle}>Our Process</h2>
        </div>

        <div className={styles.processGrid}>
          {process.map((item, i) => (
            <motion.div
              key={i}
              className={styles.processCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className={styles.processStep}>{item.step}</span>
              <h4 className={styles.processTitle}>{item.title}</h4>
              <p className={styles.processDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>Let's Discuss Your Project</h2>
          <p className={styles.ctaText}>
            Every great partnership starts with a conversation.
          </p>
          <Link href="/book" className={styles.ctaButton}>
            Schedule a Consultation
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
