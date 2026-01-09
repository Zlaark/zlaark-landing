'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import styles from './CaseStudy.module.css';

// Sample project data (in production, this would come from a CMS or API)
const projectsData: Record<string, any> = {
  'venture-core': {
    title: 'Venture Core',
    category: 'FinTech Platform',
    heroImage: 'https://picsum.photos/id/20/1920/1080',
    meta: {
      client: 'Venture Core Inc.',
      industry: 'Financial Technology',
      services: 'Web Design, Development',
      timeline: '12 Weeks',
    },
    challenge: {
      title: 'Reimagining Investment',
      text: `Venture Core approached us with a clear mission: disrupt the traditional investment landscape by creating a platform that makes sophisticated trading accessible to everyone.

Their existing platform was functional but lacked the polish and intuitive design needed to inspire confidence in first-time investors. The challenge was to balance complex financial data with an approachable, elegant interface.`,
    },
    solution: {
      title: 'Design That Builds Trust',
      text: `We developed a comprehensive design system that prioritizes clarity without sacrificing depth. Every element was crafted to reduce cognitive load while providing power users with the tools they need.

Key innovations included a real-time portfolio visualization system, contextual tooltips for financial terminology, and a progressive disclosure approach that reveals complexity only when needed.`,
    },
    results: [
      { number: '340%', label: 'User Engagement Increase' },
      { number: '$2M', label: 'Series A Funding Raised' },
      { number: '4.9', label: 'App Store Rating' },
    ],
    gallery: [
      { src: 'https://picsum.photos/id/21/1200/750', large: true },
      { src: 'https://picsum.photos/id/22/600/400', large: false },
      { src: 'https://picsum.photos/id/23/600/400', large: false },
    ],
    testimonial: {
      quote: "Zlaark didn't just redesign our platform—they transformed how our users think about investing. The results speak for themselves.",
      author: 'Michael Chen',
      role: 'CEO, Venture Core',
    },
    navigation: {
      prev: { slug: 'quant-x', title: 'Quant X' },
      next: { slug: 'nebula-stream', title: 'Nebula Stream' },
    },
  },
  'nebula-stream': {
    title: 'Nebula Stream',
    category: 'Streaming Platform',
    heroImage: 'https://picsum.photos/id/26/1920/1080',
    meta: {
      client: 'Nebula Media',
      industry: 'Entertainment',
      services: 'Mobile App, Web App',
      timeline: '16 Weeks',
    },
    challenge: {
      title: 'Competing with Giants',
      text: `In a market dominated by streaming giants, Nebula needed a platform that could carve out its niche. They wanted to focus on independent artists and curated playlists.

The challenge was creating an experience that felt premium while highlighting the human curation that sets them apart from algorithm-driven competitors.`,
    },
    solution: {
      title: 'Human-Centered Streaming',
      text: `We designed a platform that puts curators front and center. Each playlist tells a story, with rich editorial content that gives context to the music.

The interface celebrates album art and artist photography, creating an immersive visual experience that honors the craft of music creation.`,
    },
    results: [
      { number: '2.5M', label: 'Monthly Active Users' },
      { number: '89%', label: 'User Retention Rate' },
      { number: '15min', label: 'Avg. Session Duration' },
    ],
    gallery: [
      { src: 'https://picsum.photos/id/27/1200/750', large: true },
      { src: 'https://picsum.photos/id/28/600/400', large: false },
      { src: 'https://picsum.photos/id/29/600/400', large: false },
    ],
    testimonial: {
      quote: "They understood our vision from day one. The platform they built isn't just beautiful—it's a statement about what streaming can be.",
      author: 'Sarah Lin',
      role: 'Founder, Nebula Media',
    },
    navigation: {
      prev: { slug: 'venture-core', title: 'Venture Core' },
      next: { slug: 'apex-health', title: 'Apex Health' },
    },
  },
};

// Default fallback for unknown slugs
const defaultProject = {
  title: 'Project',
  category: 'Case Study',
  heroImage: 'https://picsum.photos/id/30/1920/1080',
  meta: {
    client: 'Client Name',
    industry: 'Industry',
    services: 'Services',
    timeline: 'Timeline',
  },
  challenge: {
    title: 'The Challenge',
    text: 'Challenge description goes here.',
  },
  solution: {
    title: 'Our Solution',
    text: 'Solution description goes here.',
  },
  results: [
    { number: '100%', label: 'Improvement' },
  ],
  gallery: [],
  testimonial: {
    quote: 'Great work!',
    author: 'Client',
    role: 'Role',
  },
  navigation: {
    prev: null,
    next: null,
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug] || defaultProject;

  return (
    <main className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={project.heroImage} alt={project.title} />
        </div>
        <div className={styles.heroOverlay} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroCategory}>{project.category}</span>
          <h1 className={styles.heroTitle}>{project.title}</h1>
        </motion.div>
      </section>

      {/* ===== META INFO ===== */}
      <section className={styles.metaSection}>
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Client</span>
            <span className={styles.metaValue}>{project.meta.client}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Industry</span>
            <span className={styles.metaValue}>{project.meta.industry}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Services</span>
            <span className={styles.metaValue}>{project.meta.services}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>{project.meta.timeline}</span>
          </div>
        </div>
      </section>

      {/* ===== CHALLENGE ===== */}
      <section className={styles.contentSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.sectionLabel}>The Challenge</span>
          <h2 className={styles.sectionTitle}>{project.challenge.title}</h2>
          <div className={styles.sectionText}>
            {project.challenge.text.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className={styles.contentSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.sectionLabel}>Our Approach</span>
          <h2 className={styles.sectionTitle}>{project.solution.title}</h2>
          <div className={styles.sectionText}>
            {project.solution.text.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className={styles.resultsSection}>
        <div className={styles.resultsGrid}>
          {project.results.map((result: any, i: number) => (
            <motion.div
              key={i}
              className={styles.resultItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className={styles.resultNumber}>{result.number}</span>
              <span className={styles.resultLabel}>{result.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      {project.gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {project.gallery.map((img: any, i: number) => (
              <motion.div
                key={i}
                className={`${styles.galleryImage} ${img.large ? styles.large : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={img.src} alt={`${project.title} gallery ${i + 1}`} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TESTIMONIAL ===== */}
      <section className={styles.testimonialSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className={styles.testimonialQuote}>"{project.testimonial.quote}"</p>
          <p className={styles.testimonialAuthor}>
            <strong>{project.testimonial.author}</strong>
            {project.testimonial.role}
          </p>
        </motion.div>
      </section>

      {/* ===== NAVIGATION ===== */}
      <section className={styles.navSection}>
        <div className={styles.navGrid}>
          {project.navigation.prev && (
            <Link href={`/work/${project.navigation.prev.slug}`} className={styles.navItem}>
              <span className={styles.navLabel}>
                <ArrowLeft size={14} style={{ marginRight: '0.5rem' }} />
                Previous Project
              </span>
              <span className={styles.navTitle}>{project.navigation.prev.title}</span>
            </Link>
          )}
          {project.navigation.next && (
            <Link href={`/work/${project.navigation.next.slug}`} className={`${styles.navItem} ${styles.next}`}>
              <span className={styles.navLabel}>
                Next Project
                <ArrowRight size={14} style={{ marginLeft: '0.5rem' }} />
              </span>
              <span className={styles.navTitle}>{project.navigation.next.title}</span>
            </Link>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
          <Link href="/book" className={styles.ctaButton}>
            Schedule a Consultation
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
