'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import FloatingParticles from '../components/Effects/FloatingParticles';
import GradientBlob from '../components/Effects/GradientBlob';
import Clients from '../components/Clients/Clients';
import CreationSphere from '../components/Three/CreationSphere';
import { useTheme } from '../context/ThemeContext';
import styles from './About.module.css';
import EntropyGrid from '../components/Creative/EntropyGrid';
import ScatterSnapValues from '../components/Creative/ScatterSnapValues';
import CreativeTeam from '../components/Creative/CreativeTeam';

// --- Components ---

function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) {
  // A simple marquee-like effect or just scroll-driven parallax
  // For this design, we want scroll-driven horizontal movement
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1000], [0, baseVelocity * 5]); 
  
  return (
    <motion.div className={styles.parallaxLine} style={{ x }}>
      <span>{children}</span>
    </motion.div>
  );
}

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
  },
  {
    name: 'Design Lead',
    role: 'Senior UI/UX Designer',
    image: null,
  },
  {
    name: 'Tech Lead',
    role: 'Principal Engineer',
    image: null,
  },
];



export default function AboutPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';
  
  // --- WARP DRIVE PHYSICS (Selective) ---
  const { scrollY: globalScrollY } = useScroll(); // Window scroll
  const scrollVelocity = useVelocity(globalScrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const skewY = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);

  // Sticky Scroll Refs removed (Values component handles its own layout)
  const targetRef = useRef(null);
  
  // Cleaned up unused scroll logic causing 'not hydrated' error


  return (
    <main className={styles.page}>
      {/* ===== KINETIC HERO (Warped) ===== */}
      <motion.section className={styles.hero} style={{ skewY }}>
        <div className={styles.heroBackground}>
          <FloatingParticles count={30} color={particleColor} />
          <GradientBlob position="top-right" color1="rgba(212, 175, 55, 0.1)" size={600} />
        </div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className={styles.heroLabel}>The Agency</span>
          
          <div className={styles.kineticTitle}>
             {/* Line 1 moves Left */ }
             <ParallaxText baseVelocity={-20}>ARCHITECTS</ParallaxText>
             {/* Line 2 moves Right */ }
             <ParallaxText baseVelocity={15}>OF DIGITAL</ParallaxText>
             {/* Line 3 moves Left */ }
             <ParallaxText baseVelocity={-10}>EXCELLENCE</ParallaxText>
          </div>

          <p className={styles.heroSubtitle}>
            We craft digital experiences that elevate brands, captivate audiences, 
            and drive measurable business outcomes.
          </p>
        </motion.div>
      </motion.section>

      {/* ===== CLIENTS (Warped) ===== */}
      <motion.section className={styles.clientsSection} style={{ skewY }}>
        <div className={styles.sectionHeader} style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '4rem' }}>
           <span className={styles.sectionLabel}>Trusted By Visionaries</span>
        </div>
        <Clients />
      </motion.section>

      {/* ===== STORY (Warped) ===== */}
      <motion.section className={styles.storySection} style={{ skewY }}>
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
            </div>
          </motion.div>

          <motion.div
            className={styles.storyVisual}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CreationSphere />
          </motion.div>
        </div>
      </motion.section>

      {/* ===== CREATIVE VALUES (Scatter → Snap) ===== */}
      <ScatterSnapValues />

      {/* ===== STATS (Warped) ===== */}
      <motion.section className={styles.statsSection} style={{ skewY }}>
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
      </motion.section>

      {/* ===== CREATIVE TEAM SECTION ===== */}
      <CreativeTeam />

      {/* ===== CTA (Warped) ===== */}
      <motion.section className={styles.ctaSection} style={{ skewY }}>
        <h2 className={styles.ctaTitle}>Ready to Defy<br/>Expectations?</h2>
        <Link href="/contact" className={styles.ctaButton}>
          Start Project
        </Link>
      </motion.section>
    </main>
  );
}



