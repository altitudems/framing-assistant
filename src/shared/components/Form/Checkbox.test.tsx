import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('renders with label', () => {
    render(<Checkbox label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: /accept/i });
    expect(checkbox).toBeInTheDocument();
  });

  test('toggles when clicked', () => {
    render(<Checkbox label="Accept" />);
    const checkbox = screen.getByRole('checkbox', { name: /accept/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Accept" onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox', { name: /accept/i });
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('supports indeterminate state', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole('checkbox', { name: /select all/i }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });
});
