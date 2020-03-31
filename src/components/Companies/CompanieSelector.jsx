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
import AssociateProject from './AssociateProject';

import styles from './Companies.module.scss';

const CompanieSelector = ({
  companies,
  createCompanyService,
  companyToSelect,
  associateModal,
  projects,
  actionOn,
  actionModal,
  companyForAssign,
}) => {
  const [createCompany, setCreateCompany] = useState(false);

  const CompanieOptions = (arrOption) => {
    return arrOption.map((option, index) => {
      return (
        <MenuItem value={option.id} key={index} selected={index === 0}>
          {option.name}
        </MenuItem>
      );
    });
  };
  const createACompany = () => {
    setCreateCompany(!createCompany);
  };
  const selectCompany = (element) => {
    const company = element.target.value;
    companyToSelect(company);
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
          <Select onChange={selectCompany}>{CompanieOptions(companies)}</Select>
        </FormControl>
        <div className={styles.actions}>
          <Button
            classes={{ root: styles.btnStyle }}
            variant="contained"
            onClick={createACompany}
          >
            CREAR COMPAÑÍA
          </Button>
          <Button
            classes={{ root: styles.btnStyle }}
            variant="contained"
            onClick={associateModal}
          >
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
      {actionOn && (
        <AssociateProject
          projects={projects}
          actionModal={actionModal}
          actionOn={actionOn}
          companyForAssign={companyForAssign}
        />
      )}
    </React.Fragment>
  );
};

CompanieSelector.propTypes = {
  companies: PropTypes.array,
  createCompanyService: PropTypes.func,
  companyToSelect: PropTypes.func,
  associateModal: PropTypes.func,
  projects: PropTypes.array,
  actionModal: PropTypes.func,
  actionOn: PropTypes.bool,
};

export default CompanieSelector;
