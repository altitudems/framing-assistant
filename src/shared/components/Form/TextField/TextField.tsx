import React from 'react';
import styles from './TextField.module.css';
import classNames from 'classnames';

type TextFieldStyleType = 'filled' | 'outline';
type TextFieldSize = 'small' | 'medium' | 'large';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  styleType?: TextFieldStyleType;
  size?: TextFieldSize;
  className?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  styleType = 'outline',
  size = 'medium',
  className,
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  id,
  ...props
}) => {
  const inputId =
    id || (label ? `textfield-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);

  const wrapperClass = classNames(
    styles.wrapper,
    styles[`${styleType}`],
    styles[size],
    { [styles.fullWidth]: fullWidth },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        <input id={inputId} className={styles.input} {...props} />
        {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
      </div>
    </div>
  );
};

export default TextField;
