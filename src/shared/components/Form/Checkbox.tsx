import React, { useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';
import classNames from 'classnames';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  indeterminate = false,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input id={inputId} type="checkbox" ref={ref} className={styles.checkbox} {...props} />
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
