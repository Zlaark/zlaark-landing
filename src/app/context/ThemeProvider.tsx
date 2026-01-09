'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useState<'dark'>('dark');
  const [isTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize - basically just set mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to document (always dark)
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('zlaark-theme', 'dark');
    }
  }, [mounted]);

  const toggleTheme = useCallback(() => {
    // Disabled - theme is forced to dark
    console.log('Theme toggling is disabled.');
  }, []);

  // Prevent flash of wrong theme during hydration
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {}, isTransitioning: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}
