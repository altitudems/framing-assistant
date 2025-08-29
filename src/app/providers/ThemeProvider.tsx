import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import styles from './ThemeProvider.module.css';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; theme?: Theme }> = ({ children, theme: externalTheme }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (externalTheme) return externalTheme;
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'dark';
  });

  useEffect(() => {
    const currentTheme = externalTheme || theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [theme, externalTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(() => ({
    theme: externalTheme || theme,
    toggleTheme
  }), [theme, externalTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={styles.themeProvider}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
