/*
 * Created by Jcatman on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import ContractList from '../ContractList/ContractList';
import SimpleSnackbar from '../../UI2/ToastAlert/ToastAlert';
import styles from './Navbar.module.scss';

const Navbar = ({
  towerId,
  handleOpenContract,
  editContractOpen,
  sendId,
  currentContract,
}) => {
  const [opened, setOpened] = React.useState(false);
  const [message, setMessage] = React.useState('false');

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
        currentContract={currentContract}
      />
    </div>
  );
};

export default Navbar;
