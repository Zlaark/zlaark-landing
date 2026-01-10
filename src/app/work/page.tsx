'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Work.module.css';

// Expanded Dataset
const allProjects = [
  {
    id: 'GESSURE',
    title: 'GESSURE',
    category: 'Mobile, Web',
    year: '2025',
    image: '/g-mockup.png',
    color: '#16213e',
  },
  {
    id: 'UNEXT DOOR',
    title: 'UNEXT DOOR',
    category: 'Mobile',
    year: '2024',
    image: '/nextdoor.webp',
    color: '#1a1a2e',
  },
  // {
  //   id: 'nebula-stream',
  //   title: 'Nebula Stream',
  //   category: 'Mobile',
  //   year: '2024',
  //   image: 'https://picsum.photos/id/26/1200/900',
  //   color: '#16213e',
  // },
  {
    id: 'VARAAKIE',
    title: 'VARAAKIE',
    category: 'Web, E-Commerce',
    year: '2025',
    image: '/v-mockup.png',
    color: '#0f3460',
  },
  {
    id: 'SKOAL',
    title: 'SKOAL',
    category: 'Web',
    year: '2025',
    image: '/s-mockup.png',
    color: '#1a1a2e',
  },
  {
    id: 'ASSURE QAI',
    title: 'ASSURE QAI',
    category: 'Web',
    year: '2025',
    image: '/a-mockup.png',
    color: '#16213e',
  },
  // {
  //   id: 'urbanscape',
  //   title: 'Urbanscape',
  //   category: 'Branding',
  //   year: '2022',
  //   image: 'https://picsum.photos/id/65/1200/900',
  //   color: '#0f3460',
  // },
  // {
  //   id: 'nova-systems',
  //   title: 'Nova Systems',
  //   category: 'Web',
  //   year: '2022',
  //   image: 'https://picsum.photos/id/76/1200/900',
  //   color: '#2a2a2a',
  // },
  // {
  //   id: 'echo-audio',
  //   title: 'Echo Audio',
  //   category: 'Mobile',
  //   year: '2022',
  //   image: 'https://picsum.photos/id/88/1200/900',
  //   color: '#333',
  // },
  // {
  //   id: 'zenith-fashion',
  //   title: 'Zenith Fashion',
  //   category: 'E-Commerce',
  //   year: '2021',
  //   image: 'https://picsum.photos/id/99/1200/900',
  //   color: '#000',
  // }
];

const categories = ['All', 'Web', 'Mobile', 'E-Commerce', 'Branding'];

// --- Text Scramble Effect ---
const ScrambleText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const [display, setDisplay] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#';

  useEffect(() => {
    if (!isActive) {
      setDisplay(text);
      return;
    }

    let interval: NodeJS.Timeout;
    let iteration = 0;

    interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return <span>{display}</span>;
};

// --- Sliced Image Component ---
const SlicedImage = ({ src, alt }: { src: string; alt: string }) => {
  const slices = 5;

  return (
    <div className={styles.slicedWrapper}>
      <div className={styles.staticBg}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '24px'
          }}
        />
      </div>

      {[...Array(slices)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.slice}
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.08,
          }}
          style={{
            left: `${(i / slices) * 100}%`,
            width: `${100 / slices}%`,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            boxShadow: 'none',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: `-${i * 100}%`,
            width: `${slices * 100}%`,
            height: '100%',
          }}>
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '24px'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};


export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeId, setActiveId] = useState(allProjects[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { theme } = useTheme();

  // Filter projects
  const filteredProjects = useMemo(() => {
    return activeCategory === 'All'
      ? allProjects
      : allProjects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Ensure activeId is valid when filtering
  useEffect(() => {
    if (!filteredProjects.find(p => p.id === activeId)) {
      if (filteredProjects.length > 0) {
        setActiveId(filteredProjects[0].id);
      }
    }
  }, [activeCategory, filteredProjects, activeId]);

  const activeProject = filteredProjects.find(p => p.id === activeId) || filteredProjects[0];

  return (
    <main className={styles.page}>
      <div className={styles.splitContainer}>

        {/* LEFT PANEL - Scrollable List */}
        <div className={styles.leftPanel}>
          <div className={styles.leftHeader}>
            <div className={styles.headerTop}>
              <span className={styles.labelSmall}>Selected Works</span>
              <span className={styles.projectCount}>
                {filteredProjects.length} Projects
              </span>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div className={styles.filterLine} layoutId="filterLine" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div className={styles.scrollArea} data-lenis-prevent layoutScroll>
            <nav className={styles.projectList}>
              <AnimatePresence mode="wait">
                {/* Key changes on filter to trigger re-render of list animation */}
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className={`${styles.projectItem} ${activeId === project.id ? styles.active : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div
                        className={styles.projectLink}
                        onClick={() => setActiveId(project.id)}
                      >
                        <span className={styles.projectIndex}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.projectTitle}>
                          <ScrambleText text={project.title} isActive={hoveredId === project.id || activeId === project.id} />
                        </span>
                      </div>

                      {/* Active Scanner Line - No layoutId to prevent scroll reset */}
                      <motion.div
                        className={styles.activeScanner}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeId === project.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </nav>
          </motion.div>

          {/* Project Details Footer */}
          {activeProject && (
            <motion.div
              className={styles.projectDetails}
              key={activeProject.id} // Re-animates on change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Client</span>
                <span className={styles.detailValue}>{activeProject.title}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Industry</span>
                <span className={styles.detailValue}>{activeProject.category}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Year</span>
                <span className={styles.detailValue}>{activeProject.year}</span>
              </div>
              <Link href={`/work/${activeProject.id}`} className={styles.viewLink}>
                View Case Study <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          )}
        </div>

        {/* RIGHT PANEL - Sticky Canvas */}
        <div className={styles.rightPanel}>
          <AnimatePresence mode="popLayout">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                className={styles.imageContainer}
                initial={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                <SlicedImage src={activeProject.image} alt={activeProject.title} />

                <div className={styles.overlayContent}>
                  <motion.h2
                    className={styles.bigTitle}
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeProject.title}
                  </motion.h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
