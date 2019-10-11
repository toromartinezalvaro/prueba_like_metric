/*
 * Created by Jcatman on Wed Oct 09 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Accordion from '../UI/Accordion/Accordion';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import Select from 'react-select';
import BusinessPatner from '../BusinessPatner/BusinessPatner';


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
    setCreateNewPatner(isTrue)
  }

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
          <Accordion
            className={styles.accordion}
            trigger={`General Information`}
          // eslint-disable-next-line react/no-children-prop
          >
            <div className={styles.wrapper}>
              <div className={styles.gridOne}>
                <Input
                  type={'text'}
                  name={'contractTitle'}
                  placeholder={'Contract Title'}
                  validations={[]}
                  onChange={handleContractTitleValue}
                ></Input>

                <span>Socios</span>
                <div className="patnerActions">
                  <Select
                    name="business patner"
                    className = { styles.businessPatner}
                    options={[{ value: '', label: 'upus' }]}
                  />
                  <button onClick={handleCreateNewPatner} className={styles.addPatner}>+</button>
                  {createNewPatner?<Modal style={{ width: '85vw', height: '95vh' }}><BusinessPatner></BusinessPatner></Modal>:null}
                </div>

                <span>Categoría</span>
                <Select
                  name="category"
                  options={[{ value: '', label: 'Admin' }]}
                />
                
              </div>

              <div className={styles.gridOne}>
                <span>Estado</span>
                <Select
                  name="status"
                  options={[
                    { value: '', label: 'Draft' },
                    { value: '', label: 'In Negotiation' },
                  ]}
                />

                <Input
                  name="contractNumber"
                  placeholder="Contract Number"
                  validations={[]}
                  onChange={handleContractNumber}
                ></Input>

                <span>Contrato principal</span>
                <Select
                  name="masterContract"
                  options={[{ value: '', label: 'Contrato Principal' }]}
                />
              </div>
            </div>

            <div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="description-contracts"
                className={styles.textComments}
              ></textarea>
            </div>
          </Accordion>
          <Accordion
            className={styles.accordion}
            trigger={`Lyfecicle`}
          // eslint-disable-next-line react/no-children-prop
          ></Accordion>
          <Accordion
            className={styles.accordion}
            trigger={`Billing & Financials`}
          // eslint-disable-next-line react/no-children-prop
          ></Accordion>
        </Modal>
      ) : null}
    </div>
  );
};

export default Navbar;
