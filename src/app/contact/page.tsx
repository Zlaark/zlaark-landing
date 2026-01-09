'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';
import FloatingParticles from '../components/Effects/FloatingParticles';
import { useTheme } from '../context/ThemeContext';
import styles from './Contact.module.css';

const budgetOptions = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Not Sure Yet',
];

export default function ContactPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll be in touch soon.');
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
          <span className={styles.heroLabel}>Get in Touch</span>
          <h1 className={styles.heroTitle}>Let's Create Together</h1>
          <p className={styles.heroSubtitle}>
            Have a project in mind? We'd love to hear about it.
          </p>
        </motion.div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className={styles.contactSection}>
        <div className={styles.contactGrid}>
          {/* Info Side */}
          <motion.div
            className={styles.infoSide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email</span>
              <p className={styles.infoValue}>
                <a href="mailto:hello@zlaark.com">hello@zlaark.com</a>
              </p>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Location</span>
              <p className={styles.infoValue}>
                Amritsar, India<br />
                Working Globally
              </p>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Response Time</span>
              <p className={styles.infoValue}>
                Within 24 Hours
              </p>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Dribbble">
                <Dribbble size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className={styles.formSide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.formInput}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={styles.formInput}
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Company</label>
                  <input
                    type="text"
                    name="company"
                    className={styles.formInput}
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Budget Range</label>
                  <select
                    name="budget"
                    className={styles.formSelect}
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Budget</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Project Details</label>
                <textarea
                  name="message"
                  className={styles.formTextarea}
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
