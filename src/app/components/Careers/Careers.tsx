'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import KineticRings from '../Three/KineticRings';
import { useTheme } from '../../context/ThemeContext';
import styles from './Careers.module.css';

export default function Careers() {
  const { theme } = useTheme();
  const isDarkMode = theme !== 'light';

  return (
    <section className={styles.section} id="careers">
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <KineticRings isDarkMode={isDarkMode} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="city" />
        </Canvas>
      </div>

      <div className={styles.overlay}>
        <button className={styles.ctaButton}>
            Open Positions
        </button>
      </div>
    </section>
  );
}
