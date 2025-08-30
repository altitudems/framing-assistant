import React from 'react';
import styles from './AppHeader.module.css';
import { Button, useColorMode } from '@chakra-ui/react';

const AppHeader: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}></div>
      <div className={styles.rightContent}>
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          className={styles.themeToggle}
        >
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
