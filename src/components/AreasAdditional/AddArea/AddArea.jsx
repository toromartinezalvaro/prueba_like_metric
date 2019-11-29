/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 13th November 2019 12:04:21 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Fab,
} from '@material-ui/core';
import Styles from './AddArea.module.scss';
import Button from '../../UI/Button/Button';

const AddArea = (props) => {
  const [open, setOpen] = React.useState(false);
  const [unit, setUnit] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [quantity, setQuantity] = React.useState(null);
  const [name, setName] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (name && quantity && unit) {
      props.addAreaHandler(unit, quantity, name);
      setOpen(false);
    }
  };

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeQuantity = (event) => {
    if (event.target.value >= 0) {
      setErrorMessage('');
      setError(false);
      setQuantity(event.target.value);
    } else {
      setErrorMessage('Debe ser mayor a 0');
      setQuantity(null);
      setError(true);
    }
  };

  return (
    <div>
      <div className={Styles.Container}>
        <Fab
          color="primary"
          aria-label="add"
          className={Styles.MuiFab}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Agregar area'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={Styles.DialogContainer}>
              <TextField
                required
                onChange={onChangeName}
                id="standard-required"
                label="Nombre"
                margin="normal"
              />
              <FormControl required>
                <InputLabel id="demo-simple-select-required-label">
                  Tipo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={unit}
                  onChange={handleChange}
                >
                  <MenuItem value={'MT2'}>mts²</MenuItem>
                  <MenuItem value={'UNT'}>Unidad</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={error}
                helperText={errorMessage}
                required
                onChange={onChangeQuantity.bind(this)}
                id="standard-number"
                label="Cantidad"
                type="number"
                inputProps={{ min: '0' }}
                margin="normal"
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={Styles.CancelButton}>
            Cancelar
          </Button>
          <Button onClick={handleAdd} className={Styles.ConfirmButton}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddArea;
