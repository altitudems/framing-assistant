import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import AppSidebar from './AppSidebar';

vi.mock('@tanstack/react-router', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-router')>('@tanstack/react-router');
  return {
    ...actual,
    Link: ({
      children,
    }: {
      children?: React.ReactNode | ((state: { isActive: boolean }) => React.ReactNode);
    }) =>
      typeof children === 'function'
        ? (children as (s: { isActive: boolean }) => React.ReactNode)({ isActive: false })
        : children,
  };
});

function renderWithRouter(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('AppSidebar', () => {
  it('navigates buttons render', () => {
    renderWithRouter(<AppSidebar />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  it('calls onNavigate when a link is clicked', () => {
    const onNavigate = vi.fn();
    renderWithRouter(<AppSidebar onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText(/home/i));
    expect(onNavigate).toHaveBeenCalled();
  });
});
