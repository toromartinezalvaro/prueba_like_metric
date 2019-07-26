import React from 'react';
import styles from './styles.module.scss';

export default function input({ id, label, ...rest }) {
  return (
    <div className={styles.container}>
      <input id={id} className={styles.input} {...rest} />
      <label className={styles.label} >
        {label}
      </label>
      <span className={styles.border} />
    </div>
  );
}
