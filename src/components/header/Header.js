import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss'

const header = props => (
  <header className={styles["App-header"]}>
    <img src={logo} className={styles["App-logo"]} alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className={styles["App-link"]}
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
)

export default header;