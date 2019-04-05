import React from 'react';
import styles from './Card.module.scss';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import CardFooter from './CardFooter/CardFooter';

const card = props => <div className={styles.Card}>{props.children}</div>;

export default card;
export { CardHeader, CardBody, CardFooter };