import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import styles from './Button.module.css'; // Import styles
import HomeIcon from '../../../assets/icons/HomeIcon';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.button); // Use styles.button
    expect(button).toHaveClass(styles['neutral-filled']); // Use styles
    expect(button).toHaveClass(styles.medium);
  });

  it('renders with xs size', () => {
    render(<Button size="xs">Extra Small</Button>);
    const button = screen.getByRole('button', { name: /extra small/i });
    expect(button).toHaveClass(styles.xs); // Use styles.xs
  });

  it('renders with a custom colorVariant and styleType', () => {
    render(
      <Button colorVariant="neutral" styleType="outline" size="small">
        Click Me
      </Button>,
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(styles['neutral-outline']); // Use styles
    expect(button).toHaveClass(styles.small);
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as icon-only', () => {
    render(
      <Button iconOnly aria-label="Home">
        <HomeIcon />
      </Button>,
    );
    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.iconOnly);
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders as circular', () => {
    render(
      <Button circular iconOnly aria-label="Settings">
        <HomeIcon />
      </Button>,
    );
    const button = screen.getByRole('button', { name: /settings/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.circular);
    expect(button).toHaveClass(styles.iconOnly);
  });

  it('renders a disabled button', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders an active button', () => {
    render(
      <Button colorVariant="primary" styleType="filled" size="medium" active>
        Active Button
      </Button>,
    );
    const button = screen.getByRole('button', { name: /active button/i });
    expect(button).toHaveClass(styles.active); // Use styles.active
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass('custom-class');
  });
});
