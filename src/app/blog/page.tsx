'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingParticles from '../components/Effects/FloatingParticles';
import { useTheme } from '../context/ThemeContext';
import styles from './Blog.module.css';

const featuredArticle = {
  slug: 'future-of-web-design-2025',
  title: 'The Future of Web Design: Trends Shaping 2025',
  excerpt: 'From AI-powered personalization to immersive 3D experiences, discover the trends that will define the next era of digital design.',
  category: 'Design',
  date: 'January 2, 2025',
  readTime: '8 min read',
  image: 'https://picsum.photos/id/1/1200/750',
};

const articles = [
  {
    slug: 'building-performant-nextjs-apps',
    title: 'Building Performant Next.js Applications',
    excerpt: 'A deep dive into optimization techniques that will make your Next.js apps blazing fast.',
    category: 'Development',
    date: 'December 28, 2024',
    readTime: '12 min read',
    image: 'https://picsum.photos/id/2/600/400',
  },
  {
    slug: 'psychology-of-luxury-branding',
    title: 'The Psychology of Luxury Branding',
    excerpt: 'Understanding what makes premium brands feel premium—and how to apply it to digital.',
    category: 'Strategy',
    date: 'December 20, 2024',
    readTime: '6 min read',
    image: 'https://picsum.photos/id/3/600/400',
  },
  {
    slug: 'motion-design-best-practices',
    title: 'Motion Design Best Practices for the Web',
    excerpt: 'How to use animation to enhance UX without sacrificing performance or accessibility.',
    category: 'Design',
    date: 'December 15, 2024',
    readTime: '10 min read',
    image: 'https://picsum.photos/id/4/600/400',
  },
  {
    slug: 'ecommerce-conversion-optimization',
    title: 'E-Commerce Conversion Optimization Guide',
    excerpt: 'Proven strategies to turn more browsers into buyers on your online store.',
    category: 'E-Commerce',
    date: 'December 10, 2024',
    readTime: '15 min read',
    image: 'https://picsum.photos/id/5/600/400',
  },
  {
    slug: 'three-js-beginners-guide',
    title: 'Getting Started with Three.js',
    excerpt: 'An introduction to creating stunning 3D experiences for the web.',
    category: 'Development',
    date: 'December 5, 2024',
    readTime: '20 min read',
    image: 'https://picsum.photos/id/6/600/400',
  },
  {
    slug: 'design-system-benefits',
    title: 'Why Every Brand Needs a Design System',
    excerpt: 'The hidden ROI of investing in a comprehensive design system for your organization.',
    category: 'Strategy',
    date: 'November 28, 2024',
    readTime: '7 min read',
    image: 'https://picsum.photos/id/7/600/400',
  },
];

export default function BlogPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    alert('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <main className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <FloatingParticles count={15} color={particleColor} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.heroLabel}>Insights</span>
          <h1 className={styles.heroTitle}>The Zlaark Journal</h1>
          <p className={styles.heroSubtitle}>
            Perspectives on design, development, and digital strategy.
          </p>
        </motion.div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className={styles.featuredSection}>
        <Link href={`/blog/${featuredArticle.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.featuredImage}>
              <img src={featuredArticle.image} alt={featuredArticle.title} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.featuredLabel}>Featured • {featuredArticle.category}</span>
              <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
              <span className={styles.featuredMeta}>
                {featuredArticle.date} • {featuredArticle.readTime}
              </span>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* ===== ARTICLES GRID ===== */}
      <section className={styles.articlesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
        </div>

        <div className={styles.articlesGrid}>
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <img src={article.image} alt={article.title} />
                </div>
                <div className={styles.articleContent}>
                  <span className={styles.articleCategory}>{article.category}</span>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                  <span className={styles.articleMeta}>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className={styles.newsletterSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.newsletterTitle}>Stay Updated</h2>
          <p className={styles.newsletterText}>
            Get the latest insights delivered straight to your inbox.
          </p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              className={styles.newsletterInput}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
