import React from 'react';
import styles from './Select.module.css';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ label, options, className, id, ...props }) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);

  return (
    <div className={classNames(styles.wrapper, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select id={selectId} className={styles.select} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
