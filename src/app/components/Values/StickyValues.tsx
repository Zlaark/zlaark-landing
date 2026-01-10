'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Target, Zap, Globe, ShieldCheck } from 'lucide-react';
import GradientBlob from '../Effects/GradientBlob';
import styles from './StickyValues.module.css';

const values = [
  {
    id: 1,
    title: "Revenue First",
    desc: "We prioritize conversion over vanity. Every pixel is engineered to guide user intent towards business impact.",
    icon: <Target strokeWidth={1} size={32} />,
    number: "01",
    theme: styles.themeGold
  },
  {
    id: 2,
    title: "Instant Speed",
    desc: "Seamless performance is the ultimate luxury. We optimize for millisecond-level interactions that feel effortless.",
    icon: <Zap strokeWidth={1} size={32} />,
    number: "02",
    theme: styles.themeBlue
  },
  {
    id: 3,
    title: "Global Scale",
    desc: "Architectures designed for magnitude. Our systems handle viral traffic spikes without compromising stability.",
    icon: <Globe strokeWidth={1} size={32} />,
    number: "03",
    theme: styles.themePurple
  },
  {
    id: 4,
    title: "Eternal Support",
    desc: "A partnership that endures. We provide white-glove maintenance to ensure your platform evolves with the market.",
    icon: <ShieldCheck strokeWidth={1} size={32} />,
    number: "04",
    theme: styles.themeSilver
  }
];

const Card = ({ item, activeId, setActiveId, isMobile }: { item: any, activeId: number | null, setActiveId: (id: number | null) => void, isMobile: boolean }) => {
    const isActive = isMobile || activeId === item.id;
    
    // Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive || isMobile) return;
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

    const handleClick = () => {
        if (isMobile) return; // On mobile, all cards are always expanded
        setActiveId(item.id);
    };

    return (
        <motion.div
            className={`${styles.card} ${item.theme}`}
            layout={!isMobile}
            initial={false}
            animate={isMobile ? {} : { flex: activeId === item.id ? 3 : 1 }}
            onHoverStart={() => !isMobile && setActiveId(item.id)}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Layers */}
            <div className={styles.silkLayer} />
            {/* <div className={styles.grain} /> */}
            <div className={styles.sheen} />

            <div className={styles.cardInner}>
                <div className={styles.topRow}>
                    <span className={styles.number}>{item.number}</span>
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                className={styles.icon}
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ rotateX, rotateY, perspective: 1000 }} // Parallax effect
                                transition={{ duration: 0.4 }}
                            >
                                {item.icon}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {isActive ? (
                        <motion.div
                            key="expanded"
                            className={styles.content}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.desc}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed"
                            className={styles.spine}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={styles.verticalText}>
                                {item.title}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function StickyValues() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.section}>
      {/* Background Effects */}
      <GradientBlob position="center" color1="rgba(212, 175, 55, 0.05)" size={800} />
      
      <div className={styles.header}>
        <span className={styles.label}>Our Philosophy</span>
        <h2 className={styles.title}>
            <span className={styles.titleLine1}>The Four Pillars of</span><br />
            <span className={styles.titleLine2}>Digital Excellence</span>
        </h2>
      </div>

      <div className={styles.container}>
        {values.map((item) => (
            <Card key={item.id} item={item} activeId={activeId} setActiveId={setActiveId} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
