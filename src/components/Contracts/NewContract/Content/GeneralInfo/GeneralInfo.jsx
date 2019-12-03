/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import statusOfContractEnum from './statusOfContract.enum';

import styles from './GeneralInfo.module.scss';

const Option = (props) => {
  return <components.Option {...props} className={styles.options} />;
};

const GeneralInfo = ({
  handleOpenCategory,
  handleOpenBusinessPatner,
  searchCategory,
  searchItem,
  searchBusinessPartner,
  items,
  categories,
  partners,
  categoryProp,
  partnerProp,
  itemProp,
  changeForSearchCategory,
  changeForSearchPartner,
  changeForSearchItem,
  sendGeneralInfo,
  handleOpenItem,
  handleCloseItem,
  itemIsLocked,
  currentGroupId,
  changeItemIsLocked,
}) => {
  const [generalInformation, setGeneralInformation] = useState({
    title: '',
    businessPartnerId: '',
    groupId: '',
    state: '',
    contractNumber: '',
    itemId: '',
    description: '',
  });

  const [isLocked, setIsLocked] = useState(true);
  const [isLockedEdit, setIsLockedEdit] = useState(true);

  const statusOfContract = statusOfContractEnum.map((contract) => {
    return {
      value: contract.id,
      label: contract.state,
    };
  });

  const onChangeText = (name) => (e) => {
    const information = { ...generalInformation, [name]: e.target.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
  };

  const onChangeSelect = (name) => (label) => {
    const information = { ...generalInformation, [name]: label.value };
    setGeneralInformation(information);
    sendGeneralInfo(information);
  };

  const searchForCategory = () => {
    if (categoryProp.value !== '') {
      searchCategory(categoryProp.value);
    }
  };

  const searchForPatner = () => {
    if (partnerProp.value !== '') {
      searchBusinessPartner(partnerProp.value);
    }
  };

  const searchForItem = () => {
    if (itemProp.value !== '') {
      searchItem(itemProp.value);
    }
  };

  const changeAndSearchCategory = (currentGroup) => {
    const currentGroupValue = currentGroup.value;
    setGeneralInformation({
      ...generalInformation,
      groupId: currentGroupValue,
    });
    changeForSearchCategory(currentGroup);
    changeItemIsLocked(currentGroupValue);
    currentGroupId(currentGroupValue);
    setIsLocked(false);
    if (items !== []) {
      setIsLockedEdit(false);
    }
  };

  const changeAndSearchPartner = (currentPartner) => {
    const currentPartnerValue = currentPartner.value;
    setGeneralInformation({
      ...generalInformation,
      businessPartnerId: currentPartnerValue,
    });
    changeForSearchPartner(currentPartner);
  };

  const changeAndSearchItem = (currentItem) => {
    const currentItemValue = currentItem.value;
    setGeneralInformation({ ...generalInformation, itemId: currentItemValue });
    changeForSearchItem(currentItem);
  };

  //sendGeneralInfo(generalInformation);

  return (
    <Fragment>
      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            required
            fullWidth
            className={styles.textField}
            label="Titulo De Contrato"
            margin="normal"
            variant="outlined"
            onChange={onChangeText('title')}
          />
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              <Select
                inputId="react-select-single"
                TextFieldProps={{
                  label: 'Socio de negocios',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Seleccione socio"
                options={partners}
                components={Option}
                value={partnerProp}
                onChange={changeAndSearchPartner}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={handleOpenBusinessPatner}
                className={styles.fab}
              >
                <AddIcon />
              </Fab>
              <Fab
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForPatner}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              <Select
                className={styles.selectOption}
                inputId="react-select-single"
                TextFieldProps={{
                  label: 'Selecciona un grupo',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Selecciona un grupo"
                options={categories}
                components={Option}
                value={categoryProp}
                onChange={changeAndSearchCategory}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                className={styles.fab}
                onClick={handleOpenCategory}
              >
                <AddIcon />
              </Fab>
              <Fab
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForCategory}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>

        <div className={styles.columnFullRigth}>
          <Select
            className={styles.SelectSimple}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Estado',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Estado"
            options={statusOfContract}
            components={Option}
            onChange={onChangeSelect('state')}
          />
          <TextField
            className={styles.leftInputs}
            label="Numero de contrato"
            margin="normal"
            variant="outlined"
            onChange={onChangeText('contractNumber')}
          />

          <div className={styles.gridSubContainerRigth}>
            <div className={styles.selectColumn}>
              <Select
                isDisabled={isLocked}
                className={styles.selectOption}
                inputId="react-select-single"
                TextFieldProps={{
                  label: 'item',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Seleccione un Item"
                components={Option}
                value={itemProp}
                options={items}
                onChange={changeAndSearchItem}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                disabled={isLocked}
                color="primary"
                size="small"
                aria-label="add"
                className={styles.fab}
                onClick={handleOpenItem}
              >
                <AddIcon />
              </Fab>
              <Fab
                disabled={isLockedEdit}
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                className={styles.fab}
                onClick={searchForItem}
              >
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <TextField
          multiline
          fullWidth
          rows="6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
          onChange={onChangeText('description')}
        />
      </div>
    </Fragment>
  );
};

GeneralInfo.propTypes = {
  categories: PropTypes.array,
  categoryProp: PropTypes.object,
  partnerProp: PropTypes.object,
  itemProp: PropTypes.object,
  sendGeneralInfo: PropTypes.func,
  searchItem: PropTypes.func,
};

export default GeneralInfo;
