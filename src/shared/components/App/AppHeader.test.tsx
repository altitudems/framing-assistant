import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('renders and toggles color mode', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <AppHeader />
      </ChakraProvider>,
    );

    const toggle = screen.getByRole('button', {
      name: /switch to dark mode|switch to light mode/i,
    });
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });

  it('calls onOpenSidebar when hamburger clicked', () => {
    const onOpen = vi.fn();
    render(
      <ChakraProvider value={defaultSystem}>
        <AppHeader onOpenSidebar={onOpen} />
      </ChakraProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(onOpen).toHaveBeenCalled();
  });
});
