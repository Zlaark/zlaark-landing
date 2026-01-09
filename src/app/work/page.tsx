'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import FloatingParticles from '../components/Effects/FloatingParticles';
import styles from './Work.module.css';

const categories = ['All', 'Web', 'E-Commerce', 'Mobile App', 'Branding'];

const projects = [
  {
    id: 'venture-core',
    title: 'Venture Core',
    category: 'Web',
    description: 'A sleek fintech platform for next-gen investors.',
    image: 'https://picsum.photos/id/20/800/500',
  },
  {
    id: 'nebula-stream',
    title: 'Nebula Stream',
    category: 'Mobile App',
    description: 'Cross-platform streaming experience for music lovers.',
    image: 'https://picsum.photos/id/26/800/500',
  },
  {
    id: 'apex-health',
    title: 'Apex Health',
    category: 'Web',
    description: 'Healthcare portal with patient-first design.',
    image: 'https://picsum.photos/id/39/800/500',
  },
  {
    id: 'lumina-gallery',
    title: 'Lumina Gallery',
    category: 'E-Commerce',
    description: 'Art marketplace connecting creators and collectors.',
    image: 'https://picsum.photos/id/48/800/500',
  },
  {
    id: 'quant-x',
    title: 'Quant X',
    category: 'Web',
    description: 'Analytics dashboard for institutional traders.',
    image: 'https://picsum.photos/id/56/800/500',
  },
  {
    id: 'urbanscape',
    title: 'Urbanscape',
    category: 'Branding',
    description: 'Complete brand identity for urban development firm.',
    image: 'https://picsum.photos/id/65/800/500',
  },
];

const featuredProject = {
  id: 'venture-core',
  title: 'Venture Core',
  category: 'Featured Case Study',
  description: 'A complete digital transformation for a leading fintech startup. We redesigned their platform from the ground up, resulting in a 340% increase in user engagement and $2M in Series A funding.',
  image: 'https://picsum.photos/id/20/1200/750',
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <FloatingParticles count={20} color={particleColor} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroLabel}>Portfolio</span>
          <h1 className={styles.heroTitle}>Our Work Speaks</h1>
          <p className={styles.heroSubtitle}>
            A curated collection of digital experiences that define industries.
          </p>
        </motion.div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className={styles.filterSection}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterButton} ${activeFilter === cat ? styles.active : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* ===== PROJECT GRID ===== */}
      <section className={styles.projectsSection}>
        <motion.div className={styles.projectGrid} layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/work/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.projectImage}>
                    <img src={project.image} alt={project.title} />
                    <div className={styles.projectOverlay}>
                      <ArrowUpRight size={32} color="#fff" />
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ===== FEATURED CASE STUDY ===== */}
      <section className={styles.featuredSection}>
        <motion.div
          className={styles.featuredCard}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.featuredImage}>
            <img 
              src={featuredProject.image} 
              alt={featuredProject.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>{featuredProject.category}</span>
            <h2 className={styles.featuredTitle}>{featuredProject.title}</h2>
            <p className={styles.featuredDesc}>{featuredProject.description}</p>
            <Link href={`/work/${featuredProject.id}`} className={styles.featuredButton}>
              View Case Study
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
