import React from 'react';
import styles from './CardBody.module.scss';

const cardBody = (props) => (
  <div
    className={`${styles.Body} ${props.additionalClassName}`}
    style={props.style}
  >
    {props.children}
  </div>
);

export default cardBody;
