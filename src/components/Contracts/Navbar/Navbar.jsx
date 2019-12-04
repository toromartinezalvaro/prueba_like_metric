/*
 * Created by Jcatman on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';

import styles from './Navbar.module.scss';

const Navbar = ({ handleOpenContract }) => {
  return (
    <div>
      <nav className={styles.navigationBar}>
        <ul className={styles.menuContainer}>
          <li className={styles.itemList} onClick={handleOpenContract}>
            Contratos
          </li>
        </ul>
      </nav>

      
    </div>
  );
};

export default Navbar;
