'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Briefcase, Heart, Zap, Users, Coffee } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import KineticRings from '../components/Three/KineticRings';
import { useTheme } from '../context/ThemeContext';
import styles from './Careers.module.css';

const benefits = [
  { icon: MapPin, title: 'Remote-First', desc: 'Work from anywhere in the world.' },
  { icon: Clock, title: 'Flexible Hours', desc: 'We trust you to manage your time.' },
  { icon: Heart, title: 'Health & Wellness', desc: 'Mental health days and gym stipends.' },
  { icon: Zap, title: 'Learning Budget', desc: 'Annual budget for courses and conferences.' },
  { icon: Users, title: 'Small Team', desc: 'High impact, low bureaucracy.' },
  { icon: Coffee, title: 'Team Retreats', desc: 'Annual gatherings in amazing locations.' },
];

const jobs = [
  {
    id: 'senior-frontend',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, performant web experiences using React, Next.js, and modern CSS.',
  },
  {
    id: 'ui-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Create stunning interfaces that balance aesthetics with usability.',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Operations',
    location: 'Remote',
    type: 'Full-time',
    description: 'Coordinate between teams and clients to deliver projects on time and on budget.',
  },
];

export default function CareersPage() {
  const { theme } = useTheme();
  const isDarkMode = theme !== 'light';

  return (
    <main className={styles.page}>
      {/* ===== HERO WITH 3D ===== */}
      <section className={styles.hero}>
        <div className={styles.canvasWrapper}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <KineticRings isDarkMode={isDarkMode} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="city" />
          </Canvas>
        </div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroLabel}>Careers</span>
          <h1 className={styles.heroTitle}>Join the Vanguard</h1>
          <p className={styles.heroSubtitle}>
            Help us build the future of digital experiences.
          </p>
        </motion.div>
      </section>

      {/* ===== CULTURE ===== */}
      <section className={styles.cultureSection}>
        <div className={styles.cultureGrid}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionLabel}>Our Culture</span>
            <h2 className={styles.sectionTitle}>Work That Matters</h2>
          </motion.div>

          <motion.div
            className={styles.cultureText}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>
              At Zlaark, we believe exceptional work comes from exceptional people 
              given the freedom to do their best. We're a small, focused team that 
              values craft over process and results over hours.
            </p>
            <p>
              We work with ambitious clients on challenging projects that push the 
              boundaries of what's possible on the web. If you're passionate about 
              your craft and want to work alongside people who share that passion, 
              we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className={styles.benefitsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Perks & Benefits</span>
          <h2 className={styles.sectionTitle}>Why You'll Love It Here</h2>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className={styles.benefitCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <benefit.icon className={styles.benefitIcon} size={32} strokeWidth={1} />
              <h4 className={styles.benefitTitle}>{benefit.title}</h4>
              <p className={styles.benefitDesc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section className={styles.jobsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Open Positions</span>
          <h2 className={styles.sectionTitle}>Find Your Role</h2>
        </div>

        <div className={styles.jobsList}>
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              className={styles.jobCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.jobInfo}>
                <span className={styles.jobDepartment}>{job.department}</span>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.jobDescription}>{job.description}</p>
                <div className={styles.jobMeta}>
                  <span><MapPin size={14} /> {job.location}</span>
                  <span><Briefcase size={14} /> {job.type}</span>
                </div>
              </div>
              <Link href={`/careers/${job.id}`} className={styles.jobButton}>
                Apply Now
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className={styles.noJobs}>
            <p>No open positions at the moment, but we're always looking for talent.</p>
            <Link href="/contact" className={styles.contactLink}>
              Send us your portfolio →
            </Link>
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>Don't See Your Role?</h2>
          <p className={styles.ctaText}>
            We're always interested in meeting exceptional people.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
