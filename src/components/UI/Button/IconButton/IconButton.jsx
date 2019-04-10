import React from 'react';
import styles from './IconButton.module.scss';

const iconButton = props => {

  return (
    <button {...props} className={styles.IconButton}>
      <i className={`${styles.IconButton} fas fa-plus`}></i>
    </button>
  );
}

export default iconButton;