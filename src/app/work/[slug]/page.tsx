'use client';

import { motion, useScroll, useTransform, useSpring, useVelocity, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import styles from './CaseStudy.module.css';

// --- DATA ---
const projectsData: Record<string, any> = {
  'venture-core': {
    title: 'Venture Core',
    category: 'FinTech Platform',
    heroImage: 'https://picsum.photos/id/20/1920/1080',
    description: 'Democratizing algorithmic trading for the modern investor.',
    meta: { client: 'Venture Core', services: 'Web Design', timeline: '12 Weeks' },
    sections: [
      { title: 'The Challenge', content: 'Disrupt the traditional investment landscape.', image: 'https://picsum.photos/id/21/1200/900' },
      { title: 'The Solution', content: 'Progressive disclosure design system.', image: 'https://picsum.photos/id/22/1200/900' }
    ],
    results: [{ number: '340%', label: 'Engagement' }, { number: '$2M', label: 'Funding' }, { number: '4.9', label: 'Rating' }],
    gallery: [ 'https://picsum.photos/id/23/1600/900', 'https://picsum.photos/id/24/800/1200', 'https://picsum.photos/id/25/800/1200', 'https://picsum.photos/id/26/1600/900' ],
    next: { slug: 'nebula-stream', title: 'Nebula Stream', image: 'https://picsum.photos/id/26/1920/1080' },
  },
  'nebula-stream': {
    title: 'Nebula Stream',
    category: 'Streaming',
    heroImage: 'https://picsum.photos/id/26/1920/1080',
    description: 'A human-centric streaming platform.',
    meta: { client: 'Nebula Media', services: 'Mobile App', timeline: '16 Weeks' },
    sections: [
        { title: 'Philosophy', content: 'Bring humanity back to music discovery.', image: 'https://picsum.photos/id/27/1200/900' },
        { title: 'The Craft', content: 'Every playlist is a magazine issue.', image: 'https://picsum.photos/id/28/1200/900' }
      ],
    results: [{ number: '2.5M', label: 'Users' }, { number: '89%', label: 'Retention' }, { number: '15m', label: 'Avg Session' }],
    gallery: [ 'https://picsum.photos/id/29/1600/900', 'https://picsum.photos/id/30/800/1200', 'https://picsum.photos/id/31/800/1200', 'https://picsum.photos/id/32/1600/900' ],
    next: { slug: 'venture-core', title: 'Venture Core', image: 'https://picsum.photos/id/20/1920/1080' },
  },
};

const defaultProject = { ...projectsData['venture-core'], title: 'Project Not Found' };

// --- COMPONENTS ---

// Horizontal Scroll Gallery Component
const HorizontalGallery = ({ images }: { images: string[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className={styles.horizontalSection}>
            <div className={styles.stickyContainer}>
                <h3 className={styles.galleryTitle}>Visual Exploration</h3>
                <motion.div style={{ x }} className={styles.horizontalTrack}>
                    {images.map((src, i) => (
                        <div key={i} className={styles.horizontalCard}>
                            <img src={src} alt={`Gallery ${i}`} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Skew Parallax Text (Velocity)
const SkewText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const skew = useSpring(useTransform(scrollVelocity, [-1000, 1000], [10, -10]), { stiffness: 400, damping: 90 });

    return (
        <motion.div style={{ skewX: skew }} className={className}>
            {children}
        </motion.div>
    );
};

// Parallax Rotate Image
const ParallaxRotateImage = ({ src, alt }: { src: string, alt: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    
    return (
        <motion.div ref={ref} style={{ rotate, scale }} className={styles.parallaxRotateWrapper}>
            <img src={src} alt={alt} />
        </motion.div>
    );
};

// Magnetic Button
const MagneticButton = ({ children, href }: { children: React.ReactNode, href: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };
        
        // Pull strength
        setPosition({ x: distance.x * 0.3, y: distance.y * 0.3 });
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    }

    return (
        <motion.div 
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
             <Link href={href} className={styles.magneticButton}>
                {children}
             </Link>
        </motion.div>
    )
}

export default function CaseStudyPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsData[slug] || defaultProject;

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className={styles.page}>
      
      {/* ===== HERO ===== */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div style={{ y, opacity }} className={styles.heroBackground}>
          <img src={project.heroImage} alt={project.title} />
          <div className={styles.overlay} />
        </motion.div>
        
        <div className={styles.heroContent}>
            <SkewText className={styles.heroMetaWrapper}>
                <span className={styles.categoryPill}>{project.category}</span>
                <span className={styles.year}>2024</span>
            </SkewText>

            <SkewText>
                <h1 className={styles.title}>{project.title}</h1>
            </SkewText>
            
            <motion.p 
                className={styles.intro}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {project.description}
            </motion.p>
        </div>
      </section>

      {/* ===== META DATA ===== */}
      <section className={styles.metaStrip}>
        <div className={styles.metaGrid}>
          {Object.entries(project.meta).map(([key, value]) => (
            <div key={key}>
               <span className={styles.metaLabel}>{key}</span>
               <span className={styles.metaValue}>{value as string}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NARRATIVE (Parallax Rotate) ===== */}
      <div className={styles.narrativeContainer}>
        {project.sections.map((section: any, idx: number) => (
            <section key={idx} className={styles.narrativeSection}>
                 <div className={styles.narrativeText}>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                    <p className={styles.paragraph}>{section.content}</p>
                </div>
                 <div className={styles.narrativeVisual}>
                    <ParallaxRotateImage src={section.image} alt={section.title} />
                </div>
            </section>
        ))}
      </div>

       {/* ===== HORIZONTAL SCROLL GALLERY ===== */}
       <HorizontalGallery images={project.gallery} />

      {/* ===== RESULTS ===== */}
      <section className={styles.resultsSection}>
        <div className={styles.resultsGrid}>
            {project.results.map((res: any, idx: number) => (
                <div key={idx} className={styles.resultItem}>
                    <span className={styles.resultNumber}>{res.number}</span>
                    <span className={styles.resultLabel}>{res.label}</span>
                </div>
            ))}
        </div>
      </section>

      {/* ===== NEXT PROJECT (Magnetic Interactive) ===== */}
      {project.next && (
          <section className={styles.nextProject}>
            <div className={styles.nextImageBg}>
                <img src={project.next.image} alt="Next" />
                <div className={styles.nextOverlay} />
            </div>
            
            <div className={styles.nextCenter}>
                <span className={styles.nextLabel}>Next Case Study</span>
                <MagneticButton href={`/work/${project.next.slug}`}>
                    <h2 className={styles.nextTitle}>{project.next.title}</h2>
                </MagneticButton>
            </div>
          </section>
      )}

    </main>
  );
}
