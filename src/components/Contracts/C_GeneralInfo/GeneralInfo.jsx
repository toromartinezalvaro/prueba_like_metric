import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from 'react-select';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './GeneralInfo.module.scss';
import Category from '../NewContract/C_Category/Category';
import BusinessPatner from '../NewContract/C_BusinessPatner/BusinessPatner';

const Option = (props) => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const GeneralInfo = ({
  handleOpenCategory,
  handleOpenBusinessPatner,
  searchCategory,
  categories
}) => {
  return (
    <Fragment>
      <div className={styles.gridContainer}>

        <div className={styles.columnFull}>
          <TextField required fullWidth className={styles.textField} label="Titulo De Contrato" margin="normal"
            variant="outlined" />
          <div className={styles.gridContainer}>
            <div className={styles.columnFull}>
              <TextField fullWidth required select className={styles.textField} label="Socio de negocios" margin="normal"
                variant="outlined" />
            </div>
            <div className={styles.columnFull}>
              <Fab color="primary" size="small" aria-label="add" onClick={handleOpenBusinessPatner}
                className={styles.fab}>
                <AddIcon />
              </Fab>
              <Fab color="secondary" mx={2} size="small" aria-label="edit" className={styles.fab}>
                <EditIcon />
              </Fab>
            </div>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.columnFull}>
              {/*categoryWard*/}
              <Select
                fullWidth
                inputId="react-select-single"
                TextFieldProps={{
                  label: 'Categoría',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Seleccione una categoria"
                options={suggestions}
                components={Option}
              />
            </div>
            <div className={styles.columnFull}>
              <Fab color="primary" size="small" aria-label="add" className={styles.fab} onClick={handleOpenCategory}>
                <AddIcon />
              </Fab>
              <Fab color="secondary" mx={2} size="small" aria-label="edit" className={styles.fab}>
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>

        <div className={styles.columnFull}>
          <TextField fullWidth select className={styles.textField} label="Estado" margin="normal" variant="outlined" />
          <TextField className={styles.leftInputs} label="Numero de contrato" margin="normal" variant="outlined" />
          <TextField fullWidth select className={styles.textField} label="Contrato principal" margin="normal"
            variant="outlined" />
        </div>

      </div>
      <div className={styles.gridContainer}>
        <TextField multiline fullWidth rows="6" className={styles.multiline} label="Descripción/Comentarios"
          variant="outlined" />
      </div>
    </Fragment>
  );
};

export default GeneralInfo;
