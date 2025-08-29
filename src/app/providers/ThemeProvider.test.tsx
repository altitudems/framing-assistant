import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-display">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.body.removeAttribute('data-theme');
    cleanup(); // Ensure DOM is clean before each test
  });

  it('defaults to dark theme if no theme is stored in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('loads theme from localStorage if available', () => {
    localStorageMock.setItem('theme', 'light'); // Use the correct key 'theme'
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('toggles theme correctly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const toggleButton = screen.getByRole('button', { name: /Toggle Theme/i });

    // Initially dark
    expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    // Toggle to light
    act(() => {
      toggleButton.click();
    });
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorageMock.getItem('theme')).toBe('light'); // Use the correct key 'theme'

    // Toggle to dark again
    act(() => {
      toggleButton.click();
    });
    expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorageMock.getItem('theme')).toBe('dark'); // Use the correct key 'theme'
  });

  it('throws error if useTheme is not used within ThemeProvider', () => {
    const renderWithoutProvider = () => render(<TestComponent />);
    expect(renderWithoutProvider).toThrow('useTheme must be used within a ThemeProvider');
  });
});
