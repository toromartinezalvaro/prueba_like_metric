import React from 'react';
import styles from './CardFooter.module.scss';

const cardFooter = props => <div className={styles.Footer}>{props.children}</div>;

export default cardFooter;