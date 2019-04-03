import React from 'react';
import styles from './CardHeader.module.scss';

const cardHeader = props => <div className={styles.Header}>{props.children}</div>

export default cardHeader;