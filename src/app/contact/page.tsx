'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import FloatingParticles from '../components/Effects/FloatingParticles';
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

// Stagger Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// Custom Select Component for full styling control
const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  name,
  isActive,
  onToggle
}: {
  options: string[],
  value: string,
  onChange: (value: string) => void,
  placeholder: string,
  name: string,
  isActive: boolean,
  onToggle: (name: string | null) => void
}) => {
  return (
    <div className={styles.customSelectWrapper}>
      <button 
        type="button"
        className={`${styles.selectTrigger} ${!value ? styles.empty : ''}`}
        onClick={() => onToggle(isActive ? null : name)}
      >
        {value || placeholder}
      </button>
      
      <span className={styles.underline} data-active={isActive || !!value} />
      
      <AnimatePresence>
        {isActive && (
          <motion.ul 
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <li 
                key={option} 
                className={styles.dropdownItem}
                onClick={() => {
                  onChange(option);
                  onToggle(null);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ContactPage() {
  const { theme } = useTheme();
  const particleColor = theme === 'light' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)';
  
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    budget: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isValid = formState.name && formState.email && formState.service && formState.budget;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setTimeout(() => setIsSubmitted(true), 800);
  };

  // Close dropdowns when clicking outside (simple hack: click on main container closes)
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.customSelectWrapper}`)) return;
    setOpenDropdown(null);
  };

  return (
    <main className={styles.page} onClick={handleBackgroundClick}>
      {/* Animated Gradient Background */}
      <div className={styles.gradientBg} />
      
      <FloatingParticles count={20} color={particleColor} />
      
      <div className={styles.container}>
        <motion.h6 
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Inquiry
        </motion.h6>
        
        {!isSubmitted ? (
          <motion.form 
            className={styles.form}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
          >
            {/* Single flowing paragraph */}
            <p className={styles.sentence}>
              <motion.span variants={wordVariants} className={styles.text}>Hello, my name is </motion.span>
              <motion.span variants={wordVariants} className={styles.inputWrapper}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="your name"
                  className={`${styles.input} ${!formState.name ? styles.empty : ''}`}
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => { setActiveField('name'); setOpenDropdown(null); }}
                  onBlur={() => setActiveField(null)}
                  autoComplete="off"
                />
                <span className={styles.underline} data-active={activeField === 'name'} />
              </motion.span>
              
              <motion.span variants={wordVariants} className={styles.text}> from </motion.span>
              <motion.span variants={wordVariants} className={styles.inputWrapper}>
                <input 
                  type="text" 
                  name="company"
                  placeholder="your company"
                  className={`${styles.input} ${!formState.company ? styles.empty : ''}`}
                  value={formState.company}
                  onChange={handleChange}
                  onFocus={() => { setActiveField('company'); setOpenDropdown(null); }}
                  onBlur={() => setActiveField(null)}
                  autoComplete="off"
                />
                <span className={styles.underline} data-active={activeField === 'company'} />
              </motion.span>
              
              <motion.span variants={wordVariants} className={styles.text}>. I'm looking for help with </motion.span>
              
              <motion.span variants={wordVariants} style={{ display: 'inline-flex', verticalAlign: 'baseline' }}>
                <CustomSelect 
                  name="service"
                  options={services}
                  value={formState.service}
                  onChange={(val) => handleSelectChange('service', val)}
                  placeholder="a project"
                  isActive={openDropdown === 'service'}
                  onToggle={setOpenDropdown}
                />
              </motion.span>
              
              <motion.span variants={wordVariants} className={styles.text}>, and my budget is around </motion.span>
              
              <motion.span variants={wordVariants} style={{ display: 'inline-flex', verticalAlign: 'baseline' }}>
                 <CustomSelect 
                  name="budget"
                  options={budgets}
                  value={formState.budget}
                  onChange={(val) => handleSelectChange('budget', val)}
                  placeholder="this range"
                  isActive={openDropdown === 'budget'}
                  onToggle={setOpenDropdown}
                />
              </motion.span>
              
              <motion.span variants={wordVariants} className={styles.text}>. You can reach me at </motion.span>
              <motion.span variants={wordVariants} className={styles.inputWrapper}>
                <input 
                  type="email" 
                  name="email"
                  placeholder="my email"
                  className={`${styles.input} ${!formState.email ? styles.empty : ''}`}
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => { setActiveField('email'); setOpenDropdown(null); }}
                  onBlur={() => setActiveField(null)}
                  autoComplete="off"
                />
                <span className={styles.underline} data-active={activeField === 'email'} />
              </motion.span>
              
              <motion.span variants={wordVariants} className={styles.text}> to start the conversation.</motion.span>
            </p>

            {/* Submit Button */}
            <motion.div className={styles.submitWrapper} variants={wordVariants}>
              <motion.button 
                type="submit" 
                className={styles.submitButton}
                disabled={!isValid}
                animate={{ 
                  opacity: isValid ? 1 : 0.3, 
                  scale: isValid ? 1 : 0.95,
                  filter: isValid ? 'grayscale(0%)' : 'grayscale(100%)' 
                }}
                whileHover={isValid ? { scale: 1.05 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                data-cursor="Let's Go"
              >
                Send Request <ArrowRight size={20} />
              </motion.button>
            </motion.div>

          </motion.form>
        ) : (
          <motion.div 
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div 
              className={styles.successIcon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <Check size={40} />
            </motion.div>
            <h2>Message Received.</h2>
            <p>Signal established. We'll be in touch within 24 hours.</p>
            <button 
              className={styles.resetBtn} 
              onClick={() => {
                setIsSubmitted(false); 
                setFormState({ name: '', company: '', email: '', service: '', budget: '' });
              }}>
              Send another
            </button>
          </motion.div>
        )}
      </div>

      <motion.div 
        className={styles.contactInfoFooter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.footerItem}>
          <span>Email</span>
          <a href="mailto:hello@zlaark.com" data-cursor="Copy">hello@zlaark.com</a>
        </div>
        <div className={styles.footerItem}>
          <span>Based In</span>
          <p>Global / Amritsar</p>
        </div>
        <div className={styles.footerItem}>
          <span>Socials</span>
          <div className={styles.socials}>
            <a href="#">LN</a>
            <a href="#">TW</a>
            <a href="#">IG</a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
