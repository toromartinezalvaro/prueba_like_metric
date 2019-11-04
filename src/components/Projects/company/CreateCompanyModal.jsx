import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, TextField } from '@material-ui/core';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';
import Card, { CardBody } from '../../UI/Card/Card';
import Styles from './CreateCompanyModal.module.scss';
import Button from '../../UI/Button/Button';

const CreateCompanyModal = ({
  isOpen,
  handleClose,
  onCreate,
  onAssociate,
  project,
  companies,
}) => {
  const [currentCompany, setCompany] = React.useState(undefined);

  const handleChange = (currentElement) => {
    setCompany(currentElement);
  };

  const handlingOnClick = () => {
    if (currentCompany.id) {
      onAssociate(currentCompany.id, project.id);
      return;
    }
    onCreate(currentCompany);
  };

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

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} scroll="body" maxWidth="lg">
        <DialogTitle id="scroll-dialog-title">
          {project
            ? `Aún no tienes una compañía asociada al proyecto ${project.name}`
            : 'Dale nombre a tu compañía'}
        </DialogTitle>
        <DialogContent dividers={false}>
          <Card>
            <CardBody>
              {companies.length > 0 ? (
                <div className={Styles.LargeContainer}>
                  <Select
                    fullWidth
                    inputId="react-select-single"
                    TextFieldProps={{
                      label: 'Nombre de la empresa',
                      InputLabelProps: {
                        htmlFor: 'react-select-single',
                        shrink: true,
                      },
                    }}
                    className={Styles.TextField}
                    label="Nombre de la empresa"
                    placeholder="Nombre de la empresa"
                    options={companies.map((c) => {
                      return { ...c, label: c.name, value: c.id };
                    })}
                    components={Option}
                    onChange={handleChange}
                    variant="outlined"
                    value={currentCompany}
                  />
                </div>
              ) : (
                <div className={Styles.ShortContainer}>
                  <TextField
                    fullWidth
                    className={Styles.TextField}
                    label="Nombre de la empresa"
                    value={currentCompany}
                    onChange={(event) => {
                      handleChange(event.target.value);
                    }}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlingOnClick} color="primary">
            {companies.length > 0 ? 'Guardar' : 'Crear nueva compañía'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateCompanyModal;
