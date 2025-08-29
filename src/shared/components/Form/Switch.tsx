import React from 'react';
import styles from './Switch.module.css';
import classNames from 'classnames';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, className, id, ...props }) => {
  const inputId = id || (label ? `switch-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input id={inputId} type="checkbox" role="switch" className={styles.switch} {...props} />
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;
