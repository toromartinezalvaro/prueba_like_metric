import React from 'react';
import Styles from './Input.module.scss';

const Input = ({ ...rest }) => {
  return (
    <div className={Styles.container}>
      <input className={Styles.input} {...rest} />
    </div>
  );
};

export default Input;
