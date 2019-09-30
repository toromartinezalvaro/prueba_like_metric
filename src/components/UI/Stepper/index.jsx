import React from 'react';
import Styles from './Stepper.module.scss'

const Stepper = (props) => {
  return (
    <div
      className={Styles.stepper}
    >
      {props.children}
    </div>
  );
};

export default Stepper;
