import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={`${styles.Button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
