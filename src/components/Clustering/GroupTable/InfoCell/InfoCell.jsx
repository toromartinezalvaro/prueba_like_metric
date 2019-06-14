import React from 'react';
import styles from './InfoCell.module.scss';
import NumberFormat from 'react-number-format';

const summaryCell = ({ children, ...rest }) => (
  <div className={styles.container} {...rest}>
    <div className={styles.content}>
      {children ? (
        typeof children === 'number' ? (
          <NumberFormat
            value={parseFloat(children).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          children
        )
      ) : (
        '-'
      )}
    </div>
  </div>
);

export default summaryCell;