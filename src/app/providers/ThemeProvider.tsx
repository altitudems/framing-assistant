import React, { useState, useEffect, useMemo } from 'react';
import styles from './ThemeProvider.module.css';
import { ThemeContext, type Theme } from './themeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode; theme?: Theme }> = ({
  children,
  theme: externalTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (externalTheme) return externalTheme;
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
  });

  useEffect(() => {
    const currentTheme = externalTheme || theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [theme, externalTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({
      theme: externalTheme || theme,
      toggleTheme,
    }),
    [theme, externalTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={styles.themeProvider}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Note: useTheme is exported from './themeContext'
