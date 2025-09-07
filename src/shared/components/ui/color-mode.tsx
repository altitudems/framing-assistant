import React from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Button, IconButton } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

// ColorModeProvider component that composes next-themes provider
export function ColorModeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}

// useColorMode hook that provides current color mode and toggle function
// eslint-disable-next-line react-refresh/only-export-components
export function useColorMode() {
  const { theme, setTheme } = useTheme();

  return {
    colorMode: theme === 'dark' ? 'dark' : 'light',
    setColorMode: (mode: 'light' | 'dark' | 'system') => setTheme(mode),
    toggleColorMode: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };
}

// useColorModeValue hook that returns correct value based on current color mode
// eslint-disable-next-line react-refresh/only-export-components
export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

// ColorModeButton component for toggling color mode
export function ColorModeButton({ ...props }: React.ComponentProps<typeof IconButton>) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
      {...props}
    >
      {colorMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}

// Alternative ColorModeButton using regular Button
export function ColorModeToggle({ children, ...props }: React.ComponentProps<typeof Button>) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant="ghost" size="sm" {...props}>
      {children || `Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
    </Button>
  );
}
