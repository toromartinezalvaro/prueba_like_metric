/*
 * Created by Jcatman on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import { Button } from '@material-ui/core';
import ContractList from '../ContractList/ContractList';
import styles from './Navbar.module.scss';

const Navbar = ({ towerId, handleOpenContract, editContractOpen, sendId }) => {
  return (
    <div>
      <nav className={styles.navigationBar}>
        <ul className={styles.menuContainer}>
          <li className={styles.itemList} onClick={handleOpenContract}>
            <Button variant="contained" className={styles.buttonForNewContract}>
              Crear Contratos
            </Button>
          </li>
        </ul>
      </nav>
      <ContractList
        towerId={towerId}
        editContractOpen={editContractOpen}
        sendId={sendId}
      />
    </div>
  );
};

export default Navbar;
