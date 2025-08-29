import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonColorVariant = 'primary' | 'neutral' | 'destructive';
type ButtonStyleType = 'filled' | 'ghost' | 'outline';
type ButtonSize = 'xs' | 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  colorVariant?: ButtonColorVariant; // New: determines the color palette
  styleType?: ButtonStyleType;       // New: determines the visual style
  size?: ButtonSize;
  iconOnly?: boolean;
  circular?: boolean;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  colorVariant = 'neutral', // Default changed from 'default' to 'neutral'
  styleType = 'filled',
  size = 'medium',
  iconOnly = false,
  circular = false,
  className,
  active = false, // Set default value
  ...props
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`${colorVariant}-${styleType}`], // Combine colorVariant and styleType for CSS class
    styles[size],
    { [styles.iconOnly]: iconOnly },
    { [styles.circular]: circular },
    { [styles.active]: active }, // Apply active class if prop is true
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;