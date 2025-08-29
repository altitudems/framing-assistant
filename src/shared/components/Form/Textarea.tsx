import React from 'react';
import styles from './Textarea.module.css';
import classNames from 'classnames';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  className,
  fullWidth = false,
  id,
  ...props
}) => {
  const textareaId =
    id || (label ? `textarea-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);

  return (
    <div className={classNames(styles.wrapper, { [styles.fullWidth]: fullWidth }, className)}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea id={textareaId} className={styles.textarea} {...props} />
    </div>
  );
};

export default Textarea;
