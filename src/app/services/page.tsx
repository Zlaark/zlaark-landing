'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { Palette, Code, Smartphone, ShoppingBag, Layers, Hexagon, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    id: 'design',
    num: '01',
    icon: Palette,
    title: 'Brand & Identity',
    subtitle: 'Visual Language',
    desc: 'Cutting through the noise. We craft visual identities that are not just seen, but felt. From logo systems to motion guidelines.',
    tags: ['Strategy', 'Visual Identity', 'Typography', 'Motion'],
    color: '#d4af37', // Gold
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)'
  },
  {
    id: 'web',
    num: '02',
    icon: Code,
    title: 'Web Engineering',
    subtitle: 'Next-Gen Platforms',
    desc: 'Building the unbuildable. We architect high-performance, immersive web platforms using bleeding-edge stack technologies.',
    tags: ['Next.js', 'WebGL', 'Three.js', 'Headless CMS'],
    color: '#8b5cf6', // Purple
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #1c1030 100%)'
  },
  {
    id: 'app',
    num: '03',
    icon: Smartphone,
    title: 'Mobile Ecosystems',
    subtitle: 'iOS & Android',
    desc: 'Native performance, cross-platform efficiency. We build mobile applications that feel like an extension of the OS.',
    tags: ['React Native', 'Expo', 'Store Optimization', 'Haptics'],
    color: '#06b6d4', // Cyan
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #082f36 100%)'
  },
  {
    id: 'commerce',
    num: '04',
    icon: ShoppingBag,
    title: 'Digital Commerce',
    subtitle: 'Revenue Engines',
    desc: 'Storefronts engineered to convert. We blend aesthetic appeal with consumer psychology to maximize AOV.',
    tags: ['Shopify Plus', 'Custom Checkout', 'Payment Integrations', 'CRO'],
    color: '#10b981', // Green
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #062b1e 100%)'
  },
  {
    id: 'strategy',
    num: '05',
    icon: Layers,
    title: 'Product Strategy',
    subtitle: 'Market Intelligence',
    desc: 'Data-driven roadmaps. We analyze market gaps and position your product to dominate its sector from day one.',
    tags: ['Market Analysis', 'User Personas', 'MVP Planning', 'Growth'],
    color: '#f59e0b', // Amber
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2b1c04 100%)'
  }
];

// Individual Card Component
const ServiceCard = ({ 
  data, 
  index, 
  progress, 
  range, 
  targetScale 
}: { 
  data: typeof services[0]; 
  index: number; 
  progress: MotionValue<number>;
  range: [number, number];   targetScale: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });
  
  // Scale down the card range: 1 -> targetScale
  // This animates as the NEXT cards scroll up to cover it
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Fade image or content slightly as it gets covered
  const brightness = useTransform(progress, range, [1, 0.4]);

  // Entrance animation for content
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div ref={container} className={styles.cardWrapper}>
        <motion.div 
            className={styles.card}
            style={{ 
                scale, 
                backgroundColor: data.color, 
                top: `calc(5vh + ${index * 25}px)`, 
            }}
        >
            <motion.div 
                className={styles.cardInner}
                style={{ background: data.gradient }}
            >
                {/* Visual Half (Right on Desktop, Bg on Mobile) */}
                <div className={styles.visualContainer}>
                     <div className={styles.visualOverlay} />
                     <motion.div 
                        className={styles.visualIcon}
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                     >
                        <data.icon size={200} strokeWidth={0.5} color={data.color} style={{ opacity: 0.15 }} />
                     </motion.div>
                </div>

                {/* Content Half */}
                <div className={styles.contentContainer}>
                    <div className={styles.headerRow}>
                        <span className={styles.index}>{data.num}</span>
                        <div className={styles.iconBox} style={{ borderColor: `${data.color}40`, color: data.color }}>
                            <data.icon size={24} />
                        </div>
                    </div>

                    <h2 className={styles.title}>
                        {data.title.split(" ").map((word, i) => (
                            <span key={i} className={styles.word}>{word}</span>
                        ))}
                    </h2>
                    
                    <p className={styles.description}>{data.desc}</p>

                    <div className={styles.tags}>
                         {data.tags.map((tag) => (
                             <span key={tag} className={styles.tag} style={{ borderColor: `${data.color}20` }}>
                                 <Hexagon size={10} fill={data.color} stroke="none" />
                                 {tag}
                             </span>
                         ))}
                    </div>

                    <Link href="/contact" className={styles.ctaButton} style={{ background: data.color }} data-cursor="Let's Go">
                        Start Project <ArrowRight size={18} color="#000"/>
                    </Link>
                </div>
            </motion.div>

            {/* Dimming Overlay for Stack Effect */}
            <motion.div 
                className={styles.dimLayer}
                style={{ opacity: targetScale === 1 ? 0 : useTransform(progress, range, [0, 0.6]) }} 
            />

        </motion.div>
    </div>
  );
};

export default function ServicesPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={container} className={styles.main}>
        
        {/* Intro Section - Standard Scroll */}
        <section className={styles.intro}>
            <h1 className={styles.introTitle}>Services</h1>
            <p className={styles.introDesc}>Digital solutions engineered for dominance.</p>
        </section>

        {/* Stacked Cards Section */}
        <section className={styles.stackSection}>
            {services.map((service, i) => {
                // Logic: Only scale down if there are cards AFTER this one
                const isLast = i === services.length - 1;
                const targetScale = isLast ? 1 : 1 - ( (services.length - i) * 0.05 );
                // Dimming shouldn't happen for last card
                
                return (
                    <ServiceCard 
                        key={i} 
                        index={i} 
                        data={service}
                        range={[i * 0.25, 1]} 
                        targetScale={targetScale} 
                        progress={scrollYProgress} 
                    />
                );
            })}
        </section>
        
        {/* Outro / Spacing */}
        <div className={styles.spacer} />
    </main>
  );
}
