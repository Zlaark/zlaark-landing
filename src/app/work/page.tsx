'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Work.module.css';

const projects = [
  {
    id: 'venture-core',
    title: 'Venture Core',
    category: 'Fintech Platform',
    year: '2024',
    image: 'https://picsum.photos/id/20/1200/900',
    color: '#1a1a2e',
  },
  {
    id: 'nebula-stream',
    title: 'Nebula Stream',
    category: 'Mobile App',
    year: '2024',
    image: 'https://picsum.photos/id/26/1200/900',
    color: '#16213e',
  },
  {
    id: 'apex-health',
    title: 'Apex Health',
    category: 'Healthcare Portal',
    year: '2023',
    image: 'https://picsum.photos/id/39/1200/900',
    color: '#0f3460',
  },
  {
    id: 'lumina-gallery',
    title: 'Lumina Gallery',
    category: 'E-Commerce',
    year: '2023',
    image: 'https://picsum.photos/id/48/1200/900',
    color: '#1a1a2e',
  },
  {
    id: 'quant-x',
    title: 'Quant X',
    category: 'Analytics Dashboard',
    year: '2023',
    image: 'https://picsum.photos/id/56/1200/900',
    color: '#16213e',
  },
  {
    id: 'urbanscape',
    title: 'Urbanscape',
    category: 'Brand Identity',
    year: '2022',
    image: 'https://picsum.photos/id/65/1200/900',
    color: '#0f3460',
  },
];

export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  const activeProject = projects[activeIndex];

  return (
    <main className={styles.page}>
      {/* ===== SPLIT SCREEN CONTAINER ===== */}
      <div className={styles.splitContainer}>
        
        {/* LEFT PANEL - Project List */}
        <div className={styles.leftPanel}>
          <div className={styles.leftHeader}>
            <span className={styles.labelSmall}>Selected Works</span>
            <span className={styles.projectCount}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <nav className={styles.projectList}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`${styles.projectItem} ${activeIndex === index ? styles.active : ''}`}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/work/${project.id}`} className={styles.projectLink}>
                  <span className={styles.projectIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.projectTitle}>{project.title}</span>
                  <motion.span 
                    className={styles.projectArrow}
                    animate={{ 
                      x: activeIndex === index ? 0 : -10,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.span>
                </Link>
                
                {/* Active Indicator Line */}
                <motion.div 
                  className={styles.activeLine}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Project Details */}
          <motion.div 
            className={styles.projectDetails}
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.detailCategory}>{activeProject.category}</span>
            <span className={styles.detailYear}>{activeProject.year}</span>
          </motion.div>
        </div>

        {/* RIGHT PANEL - Image Showcase */}
        <div className={styles.rightPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className={styles.imageWrapper}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={activeProject.image}
                alt={activeProject.title}
                className={styles.projectImage}
                animate={{
                  scale: isHovering ? 1.05 : 1,
                }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Overlay Gradient */}
              <div className={styles.imageOverlay} />
              
              {/* Floating Project Name */}
              <motion.h2 
                className={styles.floatingTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {activeProject.title}
              </motion.h2>
              
              {/* View CTA */}
              <Link href={`/work/${activeProject.id}`} className={styles.viewButton}>
                <span>View Project</span>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>
          
          {/* Corner Decorations */}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
        </div>
      </div>
    </main>
  );
}
