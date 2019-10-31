/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { useState, Fragment, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './GeneralInfo.module.scss';
import Category from '../NewContract/C_Category/Category';
import BusinessPatner from '../NewContract/C_BusinessPatner/BusinessPatner';

const Option = (props) => {
  return <components.Option {...props} className={styles.options} />;
};

const GeneralInfo = ({
  handleOpenCategory,
  handleOpenBusinessPatner,
  handleCloseCategory,
  searchCategory,
  searchBusinessPartner,
  categories,
  partners,
  editable,
  disableEditable,
  categoryProp,
  partnerProp,
  changeForSearchCategory,
  changeForSearchPartner,
}) => {
  const statusOfContract = [
    { state: 'Activo' },
    { state: 'En Negociación' },
    { state: 'Pendiente' },
    { state: 'Terminado' },
    { state: 'Archivado' },
    { state: 'Expirado' },
  ].map((contract) => {
    return {
      value: contract.state,
      label: contract.state,
    };
  });

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
                onChange={changeForSearchPartner}
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
                  label: 'Selecciona Una categoría',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Selecciona una categoría"
                options={categories}
                components={Option}
                value={categoryProp}
                onChange={changeForSearchCategory}
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
          />
          <TextField
            className={styles.leftInputs}
            label="Numero de contrato"
            margin="normal"
            variant="outlined"
          />
          <Select
            className={styles.SelectSimple}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Contrato principal',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Contrato principal"
            components={Option}
          />
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
        />
      </div>
    </Fragment>
  );
};

GeneralInfo.propTypes = {
  categories: PropTypes.array,
  categoryProp: PropTypes.object,
  partnerProp: PropTypes.object,
};

export default GeneralInfo;
