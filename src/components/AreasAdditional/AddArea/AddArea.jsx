/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 13th December 2019 10:53:45 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';
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
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@material-ui/core';
import Styles from './AddArea.module.scss';
import Button from '../../UI/Button/Button';

const AddArea = (props) => {
  const [open, setOpen] = React.useState(false);
  const [unit, setUnit] = React.useState(null);
  const [error, setError] = React.useState({
    name: false,
    quantity: false,
    unit: false,
    price: false,
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorMessagePrice, setErrorMessagePrice] = React.useState('');
  const [quantity, setQuantity] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [isChecked, setChecked] = React.useState({
    nomenclature: false,
    price: false,
  });
  const [price, setPrice] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (name && quantity && unit) {
      props.addAreaHandler(unit, quantity, name, isChecked, price);
      setOpen(false);
    } else {
      setError({ name: !name, unit: !unit, quantity: !quantity, price });
    }
  };

  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeChecked = (name) => (event) => {
    setChecked({ ...isChecked, [name]: event.target.checked });
  };

  const onChangeQuantity = (event) => {
    const errorTemp = error;
    if (event.target.value >= 0) {
      setErrorMessage('');
      errorTemp.quantity = false;
      setError(errorTemp);
      setQuantity(event.target.value);
    } else {
      setErrorMessage('Debe ser mayor a 0');
      setQuantity(null);
      errorTemp.quantity = true;
      setError(errorTemp);
    }
  };

  const onChangePrice = (event) => {
    const errorTemp = error;
    if (event.floatValue >= 0) {
      setErrorMessagePrice('');
      errorTemp.price = false;
      setError(errorTemp);
    } else {
      setErrorMessagePrice('Debe ser mayor a 0');
      errorTemp.price = true;
      setError(errorTemp);
    }
  };

  const onBlurPrice = (event) => {
    const priceFloat = parseFloat(event.target.value.replace(/,/g, ''));
    if (priceFloat >= 0) {
      setPrice(priceFloat);
    } else {
      setPrice(null);
    }
  };

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(e) => {
          onChangePrice(e);
        }}
        thousandSeparator
      />
    );
  }

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
                error={error.name}
                id="standard-required"
                label="Nombre"
                margin="normal"
              />
              <FormControl required>
                <InputLabel id="demo-simple-select-required-label">
                  Tipo
                </InputLabel>
                <Select
                  error={error.unit}
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
                error={error.quantity}
                helperText={errorMessage}
                required
                onChange={onChangeQuantity.bind(this)}
                id="standard-number"
                label="Cantidad"
                type="number"
                inputProps={{ min: '0' }}
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked.nomenclature}
                    onChange={handleChangeChecked('nomenclature')}
                    value="nomenclature"
                    color="primary"
                  />
                }
                label="Completar automaticamente las nomenclaturas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked.price}
                    onChange={handleChangeChecked('price')}
                    value="price"
                    color="primary"
                  />
                }
                label="Completar automaticamente los precios"
              />
              {isChecked.price && (
                <TextField
                  key={`price-add`}
                  value={price}
                  error={error.price}
                  helperText={errorMessagePrice}
                  typeOfTextField={'number'}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={onChangePrice}
                  onBlur={(e) => onBlurPrice(e)}
                />
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            isDisabled={props.disbaleSold}
            onClick={handleClose}
            className={Styles.CancelButton}
          >
            Cancelar
          </Button>
          <Button
            isDisabled={props.disbaleSold}
            onClick={handleAdd}
            className={Styles.ConfirmButton}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddArea;
