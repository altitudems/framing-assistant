import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Switch from './Switch';

describe('Switch', () => {
  test('renders with label', () => {
    render(<Switch label="Enable" />);
    const toggle = screen.getByRole('switch', { name: /enable/i });
    expect(toggle).toBeInTheDocument();
  });

  test('toggles when clicked', () => {
    render(<Switch label="Enable" />);
    const toggle = screen.getByRole('switch', { name: /enable/i }) as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  test('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Switch label="Enable" onChange={handleChange} />);
    const toggle = screen.getByRole('switch', { name: /enable/i });
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
