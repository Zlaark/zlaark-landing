'use client';

import styles from './CinematicGrain.module.css';

export default function CinematicGrain() {
  return (
    <div className={styles.grain}>
      <svg className={styles.grainSvg} xmlns='http://www.w3.org/2000/svg'>
        <filter id='noiseFilter'>
          <feTurbulence 
            type='fractalNoise' 
            baseFrequency='0.8' 
            numOctaves='3' 
            stitchTiles='stitch' 
          />
        </filter>
        <rect width='100%' height='100%' filter='url(#noiseFilter)' />
      </svg>
    </div>
  );
}
