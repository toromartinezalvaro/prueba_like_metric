import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import Styles from './Companies.module.scss';

const CreateCompany = ({ action, actionOpen, createCompanyService }) => {
  const [companyParams, setCompanyParams] = useState({
    name: undefined,
    description: undefined,
  });
  const [emptyField, setEmptyField] = useState(false);
  const changeParam = (name) => (element) => {
    const currentNewCompany = {
      ...companyParams,
      [name]: element.target.value,
    };
    setCompanyParams(currentNewCompany);
  };

  const closeAction = () => {
    setCompanyParams({
      name: undefined,
      description: undefined,
    });
    action();
  };

  const sendCompanyParams = () => {
    if (companyParams.name) {
      createCompanyService(companyParams);
      closeAction();
    } else {
      setEmptyField(true);
    }
  };
  return (
    <Dialog open={actionOpen} fullWidth="md" maxWidth="md">
      <DialogTitle>Nueva Compañía</DialogTitle>
      <DialogContent classes={{ root: Styles.dialogContent }}>
        <FormControl className={Styles.dialogContent}>
          <TextField
            className={Styles.texfieldModal}
            variant="outlined"
            required
            defaultValue={companyParams.name}
            error={emptyField}
            onChange={changeParam('name')}
            label="Ingrese el nombre de la compañía"
          />
          <TextField
            className={Styles.texfieldModal}
            multiline
            defaultValue={companyParams.description}
            rows={3}
            onChange={changeParam('description')}
            variant="outlined"
            label="Ingrese una descripción para la compañia"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAction} color="secondary">
          CANCELAR
        </Button>
        <Button onClick={sendCompanyParams} classes={{ root: Styles.btnModal }}>
          CREAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateCompany.propTypes = {
  action: PropTypes.func,
  actionOpen: PropTypes.bool,
  createCompanyService: PropTypes.func,
};

export default CreateCompany;
