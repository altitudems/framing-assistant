import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Select from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

describe('Select', () => {
  test('renders with label and options', () => {
    render(<Select label="Fruit" options={options} />);
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  test('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<Select label="Fruit" options={options} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Fruit'), { target: { value: 'banana' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Select label="Fruit" options={options} disabled />);
    expect(screen.getByLabelText('Fruit')).toBeDisabled();
  });
});
