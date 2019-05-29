import React from 'react';
import { Link } from "react-router-dom";
import styles from './FloatingButton.module.scss'

const FloatingButton = props => {

  return (
    <Link to={props.route}>
      <button className={styles.float} disabled>
        Ir a {props.children}  <i class="fas fa-angle-double-right"></i>
      </button>
    </Link>
  );
}

export default FloatingButton;