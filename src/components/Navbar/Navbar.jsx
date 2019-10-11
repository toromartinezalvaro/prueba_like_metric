/*
 * Created by Jcatman on Wed Oct 09 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Accordion from '../UI/Accordion/Accordion';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import Select from 'react-select';
import BusinessPatner from '../BusinessPatner/BusinessPatner';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const Navbar = () => {
  const [contractTitleValue, setContractTitleValue] = useState(' ');

  const [contractNumberValue, setContractNumberValue] = useState(' ');

  const [modalState, setModalState] = useState(false);

  const [createNewPatner, setCreateNewPatner] = useState(false);

  const handleContractTitleValue = (target) => {
    setContractTitleValue(target.value);
  };

  const handleContractNumber = (target) => {
    setContractNumberValue(target.value);
  };

  const handleCreateNewPatner = (isTrue) => {
    setCreateNewPatner(isTrue);
  };

  return (
    <div>
      <nav className={styles.navigationBar}>
        <ul className={styles.menuContainer}>
          <li className={styles.itemList} onClick={() => setModalState(true)}>
            Contracts
          </li>
        </ul>
      </nav>

      {modalState ? (
        <Modal style={{ width: '85vw', height: '95vh' }}>
          <Accordion className={styles.accordion} trigger="General Information">
            <div className={styles.wrapper}>
              <h3>Agregar Contrato</h3>
              <div className={styles.gridOne}>
                <FormControl className="form-control" variant="outlined">
                  <OutlinedInput
                    id="component-outlined"
                    onChange={handleContractTitleValue}
                    labelWidth="Titulo del contrato"
                  />
                  <InputLabel htmlFor="component-outlined">
                    Titulo de contrato
                  </InputLabel>
                </FormControl>
              </div>

              <div className={styles.gridTwo}></div>
            </div>

            <div></div>
          </Accordion>
          <Accordion
            className={styles.accordion}
            trigger={`Lyfecicle`}
          ></Accordion>
          <Accordion
            className={styles.accordion}
            trigger={`Billing & Financials`}
          ></Accordion>
        </Modal>
      ) : null}
    </div>
  );
};

export default Navbar;
