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
  projectToSelect,
  assignThisProject,
}) => {
  const [company, setCompany] = useState(companyForAssign.name);
  const [project, setProject] = useState('----');
  const projectSelector = (arrOption) => {
    return arrOption.projects.flatMap((option, index) => {
      return (
        <MenuItem value={option.id} key={index} selected={index === 0}>
          {option.name}
        </MenuItem>
      );
    });
  };
  const projectSelected = (element) => {
    const selection = element.target.value;
    const projectsInArray = projects.projects;
    const selectionFind = projectsInArray.find((e) => e.id === selection);
    setProject(selectionFind.name);
    projectToSelect(selection);
  };
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
          <Select onChange={projectSelected}>
            {projectSelector(projects)}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={actionModal} color="secondary">
          CANCELAR
        </Button>
        <Button classes={{ root: Styles.btnModal }} onClick={assignThisProject}>
          ASIGNAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AssociateProject.propTypes = {
  projects: PropTypes.array,
  actionModal: PropTypes.func,
  actionOn: PropTypes.bool,
  companyForAssign: PropTypes.object,
  projectToSelect: PropTypes.func,
  assignThisProject: PropTypes.func,
};

export default AssociateProject;
