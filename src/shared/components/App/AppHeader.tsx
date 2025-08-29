import React from 'react';
import styles from './AppHeader.module.css';
import { useTheme } from '../../../app/providers/ThemeProvider';
import Button from '../Base/Button'; // Import the new Button component

const AppHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}></div>
      <div className={styles.rightContent}>
        <Button
          onClick={toggleTheme}
          colorVariant="neutral" // Use neutral color palette
          styleType="ghost"    // Use ghost style
          size="small"   // Choose an appropriate size
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          className={styles.themeToggle}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;