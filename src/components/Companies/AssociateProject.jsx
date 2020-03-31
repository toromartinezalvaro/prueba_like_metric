import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import Styles from './Companies.module.scss';

const AssociateProject = ({
  projects,
  actionModal,
  actionOn,
  companyForAssign,
}) => {
  const [company, setCompany] = useState(companyForAssign.name);
  const [project, setProject] = useState('----');

  return (
    <Dialog
      open={actionOn}
      keepMounted
      fullWidth="sm"
      maxWidth="sm"
      onClose={actionModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Asignación de proyectos</DialogTitle>
      <DialogContent classes={{ root: Styles.dialogContent }}>
        <h3>
          Asignar {project} a la compañía {company}
        </h3>
        <FormControl variant="outlined" className={Styles.dialogContent}>
          <InputLabel>Seleccione un proyecto</InputLabel>
          <Select></Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={actionModal} color="secondary">
          CANCELAR
        </Button>
        <Button classes={{ root: Styles.btnModal }}>ASIGNAR</Button>
      </DialogActions>
    </Dialog>
  );
};

AssociateProject.propTypes = {};

export default AssociateProject;
