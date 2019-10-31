import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Button.module.scss';

const Button = ({ children, className, ...rest }) => {
  return (
    <button className={`${Styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  className: '',
};

export default Button;
