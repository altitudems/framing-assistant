import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
// no-op

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
import AppLayout from './AppLayout';

function renderWithRouter(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('AppLayout', () => {
  it('renders children content area', () => {
    renderWithRouter(
      <AppLayout>
        <div>Content here</div>
      </AppLayout>,
    );
    expect(screen.getByText(/content here/i)).toBeInTheDocument();
  });
});
