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
    name: null,
    description: null,
  });
  const [emptyField, setEmptyField] = useState(false);
  const changeParam = (name) => (element) => {
    const currentNewCompany = {
      ...companyParams,
      [name]: element.target.value,
    };
    setCompanyParams(currentNewCompany);
  };
  const sendCompanyParams = () => {
    if (companyParams.name) {
      createCompanyService(companyParams);
      action();
    } else {
      setEmptyField(true);
    }
  };
  return (
    <Dialog
      open={actionOpen}
      keepMounted
      fullWidth="sm"
      maxWidth="sm"
      onClose={action}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Nueva Compañía</DialogTitle>
      <DialogContent classes={{ root: Styles.dialogContent }}>
        <FormControl className={Styles.dialogContent}>
          <TextField
            className={Styles.texfieldModal}
            variant="outlined"
            required
            error={emptyField}
            onChange={changeParam('name')}
            label="Ingrese el nombre de la compañía"
          />
          <TextField
            className={Styles.texfieldModal}
            multiline
            rows={3}
            onChange={changeParam('description')}
            variant="outlined"
            label="Ingrese una descripción para la compañia"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={action} color="secondary">
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
