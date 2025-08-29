import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Textarea from './Textarea';

describe('Textarea', () => {
  test('renders with label', () => {
    render(<Textarea label="Description" />);
    const textarea = screen.getByRole('textbox', { name: /description/i });
    expect(textarea).toBeInTheDocument();
  });

  test('allows user input', () => {
    render(<Textarea label="Description" />);
    const textarea = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(textarea.value).toBe('hello');
  });

  test('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Textarea label="Description" onChange={handleChange} />);
    const textarea = screen.getByRole('textbox', { name: /description/i });
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
