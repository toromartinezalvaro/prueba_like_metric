import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, className, isDisabled, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${styles.Button} ${className}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
