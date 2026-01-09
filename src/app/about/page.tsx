'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Linkedin, Twitter, Sparkles, Target, Zap } from 'lucide-react';
import FloatingParticles from '../components/Effects/FloatingParticles';
import GradientBlob from '../components/Effects/GradientBlob';
import { useTheme } from '../context/ThemeContext';
import styles from './About.module.css';

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '5+', label: 'Years Experience' },
  { number: '12', label: 'Industries Served' },
  { number: '98%', label: 'Client Satisfaction' },
];

const team = [
  {
    name: 'Kanishk Sharma',
    role: 'Founder & Creative Director',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Design Lead',
    role: 'Senior UI/UX Designer',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Tech Lead',
    role: 'Principal Engineer',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
];

const values = [
  {
    icon: Sparkles,
    title: 'Craft Over Convention',
    desc: 'We reject templates and cookie-cutter solutions. Every pixel is intentional, every interaction purposeful.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    desc: 'Beautiful design means nothing without performance. We obsess over metrics that matter.',
  },
  {
    icon: Zap,
    title: 'Relentless Innovation',
    desc: 'We stay ahead of the curve, adopting cutting-edge technologies before they become mainstream.',
  },
];

export default function AboutPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';

  return (
    <main className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <FloatingParticles count={30} color={particleColor} />
          <GradientBlob position="top-right" color1="rgba(212, 175, 55, 0.1)" size={600} />
        </div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.heroLabel}>The Agency</span>
          <h1 className={styles.heroTitle}>
            Architects of Digital Excellence
          </h1>
          <p className={styles.heroSubtitle}>
            We craft digital experiences that elevate brands, captivate audiences, 
            and drive measurable business outcomes.
          </p>
        </motion.div>
      </section>

      {/* ===== STORY ===== */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.storyLabel}>Our Story</span>
            <h2 className={styles.storyTitle}>
              Born from obsession.<br />
              Built for impact.
            </h2>
            <div className={styles.storyText}>
              <p>
                Zlaark was founded with a singular vision: to bridge the gap between 
                artistic excellence and technical precision in the digital realm.
              </p>
              <p>
                We believe that exceptional digital experiences require more than 
                just good design or clean code — they demand a holistic approach 
                where creativity and engineering work in perfect harmony.
              </p>
              <p>
                Today, we partner with ambitious brands and forward-thinking 
                startups to create digital assets that don't just exist — they dominate.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={styles.storyVisual}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Placeholder for 3D element or image */}
            <GradientBlob position="center" color1="rgba(212, 175, 55, 0.2)" size={400} />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.statItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>The Team</span>
          <h2 className={styles.sectionTitle}>Meet the Architects</h2>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <motion.div
              key={i}
              className={styles.teamCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={styles.teamImage}>
                {/* Placeholder icon */}
                👤
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <div className={styles.teamSocial}>
                  <a href={member.linkedin} aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href={member.twitter} aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Our Principles</span>
          <h2 className={styles.sectionTitle}>What Drives Us</h2>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, i) => (
            <motion.div
              key={i}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <value.icon className={styles.valueIcon} size={40} strokeWidth={1} />
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDesc}>{value.desc}</p>
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
          <h2 className={styles.ctaTitle}>Ready to Build Something Extraordinary?</h2>
          <Link href="/book" className={styles.ctaButton}>
            Schedule a Consultation
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
