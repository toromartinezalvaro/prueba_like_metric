import React, { useState } from 'react';
import {
  Card,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CreateCompany from './CreateCompany';

import styles from './Companies.module.scss';

const CompanieSelector = ({ companies, createCompanyService }) => {
  const [createCompany, setCreateCompany] = useState(false);
  const CompanieOptions = (arrOption) => {
    return arrOption.map((option, index) => {
      return (
        <MenuItem value={option.id} key={index}>
          {option.name}
        </MenuItem>
      );
    });
  };
  const createACompany = () => {
    setCreateCompany(!createCompany);
  };
  return (
    <React.Fragment>
      <Card variant="outlined" classes={{ root: styles.cardLeft }}>
        <div className={styles.titleDashboard}>
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
          <Button
            classes={{ root: styles.btnStyle }}
            variant="contained"
            onClick={createACompany}
          >
            CREAR COMPAÑÍA
          </Button>
          <Button classes={{ root: styles.btnStyle }} variant="contained">
            AGREGAR PROYECTO
          </Button>
        </div>
      </Card>
      {createACompany && (
        <CreateCompany
          action={createACompany}
          actionOpen={createCompany}
          createCompanyService={createCompanyService}
        />
      )}
    </React.Fragment>
  );
};

CompanieSelector.propTypes = {
  companies: PropTypes.array,
  createCompanyService: PropTypes.func,
};

export default CompanieSelector;
