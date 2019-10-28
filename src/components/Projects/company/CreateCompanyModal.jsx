import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Styles from './CreateCompanyModal.module.scss';
import Button from '../../UI/Button/Button';

const CreateCompanyModal = ({
  isOpen,
  handleClose,
  createNewCompany,
  project,
}) => {
  const [company, setCompany] = React.useState({});
  const handleChange = (name) => (event) => {
    setCompany({ ...company, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} scroll="body" maxWidth="lg">
        <DialogTitle id="scroll-dialog-title">
          {project
            ? `Aún no tienes una compañía asociada al proyecto${project.name}`
            : 'Dale nombre a tu compañía'}
        </DialogTitle>
        <DialogContent dividers={false}>
          <Card>
            <CardBody>
              <TextField
                className={Styles.TextField}
                label="# Documento"
                value={company.name}
                onChange={handleChange('name')}
              />
            </CardBody>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createNewCompany} color="primary">
            Crear nueva compañía
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateCompanyModal;
