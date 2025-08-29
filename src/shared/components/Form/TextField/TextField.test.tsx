import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import TextField from './TextField';
import styles from './TextField.module.css';

describe('TextField', () => {
  test('renders with label and placeholder', () => {
    render(<TextField label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  test('applies styleType class', () => {
    const { container } = render(<TextField label="Search" styleType="filled" />);
    expect(container.firstChild).toHaveClass(styles.filled);
  });

  test('applies size class', () => {
    const { container } = render(<TextField label="Name" size="large" />);
    expect(container.firstChild).toHaveClass(styles.large);
  });

  test('renders with leading and trailing icons', () => {
    const LeadingIcon = () => <span data-testid="leading-icon">L</span>;
    const TrailingIcon = () => <span data-testid="trailing-icon">T</span>;

    render(
      <TextField label="Amount" leadingIcon={<LeadingIcon />} trailingIcon={<TrailingIcon />} />,
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  test('disables the input when disabled prop is true', () => {
    render(<TextField label="Disabled Field" disabled />);
    expect(screen.getByLabelText('Disabled Field')).toBeDisabled();
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    const { container } = render(<TextField label="Full Width" fullWidth />);
    expect(container.firstChild).toHaveClass(styles.fullWidth);
  });
});
