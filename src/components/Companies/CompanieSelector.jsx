import React from 'react';
import {
  Card,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './Companies.module.scss';

const CompanieSelector = ({ companies }) => {
  const CompanieOptions = (arrOption) => {
    return arrOption.map((option, index) => {
      return (
        <MenuItem value={option.id} key={index}>
          {option.name}
        </MenuItem>
      );
    });
  };
  return (
    <Card variant="outlined" classes={{ root: styles.cardLeft }}>
      <div className={styles.titleContainer}>
        <h3>Selecciona una de las compañías disponibles</h3>
      </div>
      <FormControl
        variant="outlined"
        classes={{ root: styles.selectController }}
      >
        <InputLabel>Seleccione una compañía</InputLabel>
        <Select>{CompanieOptions(companies)}</Select>
      </FormControl>
      <div className={styles.actions}>
        <Button classes={{ root: styles.btnStyle }} variant="contained">
          CREAR COMPAÑÍA
        </Button>
        <Button classes={{ root: styles.btnStyle }} variant="contained">
          AGREGAR PROYECTO
        </Button>
      </div>
    </Card>
  );
};

CompanieSelector.propTypes = {
  companies: PropTypes.array,
};

export default CompanieSelector;
