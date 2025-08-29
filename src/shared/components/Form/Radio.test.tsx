import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Radio from './Radio';

describe('Radio', () => {
  test('renders with label', () => {
    render(<Radio label="Option" name="group" />);
    const radio = screen.getByRole('radio', { name: /option/i });
    expect(radio).toBeInTheDocument();
  });

  test('selects when clicked', () => {
    render(<Radio label="Option" name="group" />);
    const radio = screen.getByRole('radio', { name: /option/i }) as HTMLInputElement;
    expect(radio.checked).toBe(false);
    fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });

  test('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Radio label="Option" name="group" onChange={handleChange} />);
    const radio = screen.getByRole('radio', { name: /option/i });
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('only one in group can be selected', () => {
    render(
      <div>
        <Radio label="A" name="group" value="a" />
        <Radio label="B" name="group" value="b" />
      </div>,
    );
    const radioA = screen.getByRole('radio', { name: /a/i }) as HTMLInputElement;
    const radioB = screen.getByRole('radio', { name: /b/i }) as HTMLInputElement;
    fireEvent.click(radioA);
    expect(radioA.checked).toBe(true);
    fireEvent.click(radioB);
    expect(radioB.checked).toBe(true);
    expect(radioA.checked).toBe(false);
  });
});
