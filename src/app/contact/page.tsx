'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Contact.module.css';
import FloatingParticles from '../components/Effects/FloatingParticles';

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

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  label 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string,
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.inputGroup} style={{ marginBottom: 0 }}>
      {/* Label floats if value exists or menu is open */}
      <span className={`${styles.customLabel} ${(value || isOpen) ? styles.active : ''}`}>
        {label}
      </span>
      
      <div 
        className={styles.customSelectTrigger} 
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        {value || <span className={styles.placeholder}>{placeholder}</span>}
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: 'auto', opacity: 0.5 }}
        >
          ▼
        </motion.span>
      </div>

      <motion.div 
        className={styles.customOptions}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto", y: 0, display: "block" },
          closed: { opacity: 0, pointerEvents: "none", y: -10, transitionEnd: { display: "none" } }
        }}
        transition={{ duration: 0.2 }}
      >
        {options.map((option) => (
          <div 
            key={option} 
            className={styles.optionItem}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Magnetic Component Helper
const MagneticButton = ({ children, onClick, disabled }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      className={styles.submitButton}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </motion.button>
  );
};

export default function ContactPage() {
  const { theme } = useTheme();

  // ... form state ...
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <main className={styles.page}>
      
      {/* Creative Background Effect */}
      <div className={styles.ambientLight} />

      <div className={styles.container}>
        {/* LEFT - Visual & Info */}
        <div className={styles.leftPanel}>
          {/* Particles constrained to left panel area */}
          <div className={styles.particlesContainer}>
             <FloatingParticles count={20} />
          </div>

          <div className={styles.headerContent}>
            <motion.span 
              className={styles.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.span>
            
            <h1 className={styles.heroTitle}>
              <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                Let's Create
              </motion.div>
              <motion.div 
                className={styles.outline}
                initial={{ y: '100%', opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Something
              </motion.div>
              <motion.div 
                className={styles.highlight}
                initial={{ y: '100%', opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Extraordinary
              </motion.div>
            </h1>
          </div>

          <motion.div 
            className={styles.contactDetails}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={styles.infoBlock}>
              <h3>New Business</h3>
              <a href="mailto:hello@zlaark.com" className={styles.magneticLink}>hello@zlaark.com</a>
            </div>
            
            <div className={styles.infoBlock}>
              <h3>Socials</h3>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>LinkedIn <ArrowUpRight size={14} /></a>
                <a href="#" className={styles.socialLink}>Twitter <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Form Panel */}
        <div className={styles.rightPanel}>
          {!isSubmitted ? (
            <motion.form 
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className={styles.formHeader}>Project Inquiry</h2>

              {/* ... Inputs ... */}
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

              {/* Custom Selects Row */}
              <div className={styles.formRow}>
                <div style={{ flex: 1 }}>
                  <CustomDropdown 
                     options={services}
                     value={formState.service}
                     onChange={(val) => setFormState(s => ({ ...s, service: val }))}
                     placeholder="Select Service"
                     label="Service Interest"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <CustomDropdown 
                     options={budgets}
                     value={formState.budget}
                     onChange={(val) => setFormState(s => ({ ...s, budget: val }))}
                     placeholder="Select Range"
                     label="Budget Range"
                  />
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

              {/* Magnetic Submit Button */}
              <MagneticButton disabled={!isValid}>
                <span>Send Message</span>
                <Send size={18} />
              </MagneticButton>

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
      </div>
    </main>
  );
}
