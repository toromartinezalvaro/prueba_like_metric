import React from 'react';
import styles from './Modal.module.scss';

const modal = props => (
  <div className={styles.Container}>
    <div className={styles.Modal}>
      Modal content
    </div>
  </div>
)

export default modal;