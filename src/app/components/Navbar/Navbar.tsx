'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const links = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  // { href: '/blog', label: 'Journal' }, // Hidden for now
  { href: '/contact', label: 'Contact' },
];

import Magnetic from './Magnetic';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      setIsVisible(window.scrollY > 100);
    } else {
      setIsVisible(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isHomePage) {
        setIsVisible(window.scrollY > 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Spotlight Effect Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const textColor = theme === 'light' ? '#000' : '#fff';
  const logoColor = isOpen ? (theme === 'light' ? '#000' : '#fff') : textColor;

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div 
          ref={containerRef}
          className={styles.container}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight Border Layer */}
          <div className={styles.spotlight} />

          <Link href="/" className={styles.logo} style={{ color: logoColor }}>
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.span
                  key="Z"
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Z
                </motion.span>
              ) : (
                <motion.span
                  key="ZLAARK"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  ZLAARK
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {links.map((link) => (
              <Magnetic key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  style={{ color: textColor }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeDot"
                      className={styles.activeDot}
                      style={{ backgroundColor: theme === 'light' ? '#000' : '#d4af37' }}
                    />
                  )}
                </Link>
              </Magnetic>
            ))}
          </div>

          {/* Mobile Toggle */}
          <Magnetic>
            <button
              className={styles.menuToggle}
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: logoColor }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </Magnetic>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: theme === 'light' ? 'rgba(255,255,255,0.98)' : 'rgba(0,0,0,0.98)' }}
          >
            <div className={styles.mobileLinks}>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    style={{ color: theme === 'light' ? '#000' : '#fff' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
               className={styles.mobileDecorator}
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               style={{ background: '#d4af37' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
