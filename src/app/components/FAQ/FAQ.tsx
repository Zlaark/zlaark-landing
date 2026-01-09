'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        q: "Why choose Zlaark over a freelancer?",
        a: "You aren't just buying a website; you're buying a strategic asset. We offer agency-level redundancy, expert-led strategy, and professional-grade engineering that freelancers often lack."
    },
    {
        q: "How do you handle hand-offs?",
        a: "We provide full documentation, Loom training videos, and a dedicated support window to ensure your team is never left in the dark."
    },
    {
        q: "Do you offer post-launch support?",
        a: "Yes. We don't just launch and leave. We offer ongoing optimization packages to ensure your digital asset grows with your business."
    }
];

export default function FAQ() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    
    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Common Queries</span>
                    <h2 className={styles.title}>Clarifications</h2>
                </div>
                
                <div className={styles.accordion}>
                    {faqs.map((item, i) => (
                        <div key={i} className={styles.item} onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
                            <div className={styles.question}>
                                {item.q}
                                {activeIdx === i ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                            <AnimatePresence>
                                {activeIdx === i && (
                                    <motion.p 
                                        className={styles.answer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        {item.a}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
