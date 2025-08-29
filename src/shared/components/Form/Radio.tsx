import React from 'react';
import styles from './Radio.module.css';
import classNames from 'classnames';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Radio: React.FC<RadioProps> = ({ label, className, id, ...props }) => {
  const inputId = id || (label ? `radio-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <input id={inputId} type="radio" className={styles.radio} {...props} />
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
