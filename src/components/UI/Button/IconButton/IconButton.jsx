import React from 'react';
import styles from './IconButton.module.scss';

const iconButton = props => {
  return (
    <button {...props} className={styles.IconButton}>
      <i
        className={`${styles.IconButton} ${
          props.icon ? props.icon : 'fas fa-plus'
        }`}
      />
    </button>
  );
};

export default iconButton;
