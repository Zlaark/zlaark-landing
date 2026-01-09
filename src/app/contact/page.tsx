'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Contact.module.css';

const services = [
  'Web Development',
  'Brand Identity',
  'Mobile App',
  'E-Commerce',
  'Product Strategy',
  'Other'
];

const budgets = [
  'Under $10k',
  '$10k - $30k',
  '$30k - $60k',
  '$60k+'
];

export default function ContactPage() {
  const { theme } = useTheme();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid = formState.name && formState.email && formState.message;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setTimeout(() => setIsSubmitted(true), 500);
  };

  return (
    <main className={styles.page}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div style={{ y: titleY, opacity }} className={styles.heroContent}>
          <span className={styles.label}>Get in Touch</span>
          <h1 className={styles.heroTitle}>
            Let's Create<br/>
            <span className={styles.outline}>Something</span><br/>
            Extraordinary
          </h1>
        </motion.div>
        
        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ===== SPLIT SECTION ===== */}
      <section className={styles.splitSection}>
        {/* LEFT - Info Panel */}
        <div className={styles.infoPanel}>
          <div className={styles.infoBlock}>
            <h3>New Business</h3>
            <a href="mailto:hello@zlaark.com">hello@zlaark.com</a>
          </div>
          
          <div className={styles.infoBlock}>
            <h3>Location</h3>
            <p>Global / Amritsar, IN</p>
          </div>
          
          <div className={styles.infoBlock}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>LinkedIn <ArrowUpRight size={14} /></a>
              <a href="#" className={styles.socialLink}>Twitter <ArrowUpRight size={14} /></a>
              <a href="#" className={styles.socialLink}>Instagram <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>

        {/* RIGHT - Form Panel */}
        <div className={styles.formPanel}>
          {!isSubmitted ? (
            <motion.form 
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className={styles.formIntro}>
                Tell us about your project and we'll get back to you within 24 hours.
              </p>

              {/* Name & Email Row */}
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="name" className={focusedField === 'name' || formState.name ? styles.active : ''}>
                    Your Name *
                  </label>
                  <span className={styles.inputLine} />
                </div>
                
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="email" className={focusedField === 'email' || formState.email ? styles.active : ''}>
                    Email Address *
                  </label>
                  <span className={styles.inputLine} />
                </div>
              </div>

              {/* Company */}
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formState.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                />
                <label htmlFor="company" className={focusedField === 'company' || formState.company ? styles.active : ''}>
                  Company Name
                </label>
                <span className={styles.inputLine} />
              </div>

              {/* Service & Budget Row */}
              <div className={styles.formRow}>
                <div className={styles.selectGroup}>
                  <select
                    name="service"
                    id="service"
                    value={formState.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className={styles.inputLine} />
                </div>
                
                <div className={styles.selectGroup}>
                  <select
                    name="budget"
                    id="budget"
                    value={formState.budget}
                    onChange={handleChange}
                  >
                    <option value="">Budget Range</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <span className={styles.inputLine} />
                </div>
              </div>

              {/* Message */}
              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="message" className={focusedField === 'message' || formState.message ? styles.active : ''}>
                  Project Details *
                </label>
                <span className={styles.inputLine} />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={!isValid}
                whileHover={isValid ? { x: 5 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
              >
                <span>Send Message</span>
                <Send size={18} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              className={styles.successState}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.successIcon}>
                <Check size={32} />
              </div>
              <h2>Message Sent</h2>
              <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
              <button 
                className={styles.resetButton}
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
                }}
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
