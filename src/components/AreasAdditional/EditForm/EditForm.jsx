/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 10:13:27 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import {
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import Styles from './EditForm.module.scss';

const EditForm = (props) => {
  return (
    <div className={Styles.DialogContainer}>
      <TextField
        required
        onChange={props.onChangeName}
        id="standard-required"
        label="Nombre"
        margin="normal"
      />
      <FormControl required>
        <InputLabel id="demo-simple-select-required-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={props.unit}
          onChange={props.handleChangeModal}
        >
          <MenuItem value={'MT2'}>mts²</MenuItem>
          <MenuItem value={'UNT'}>Unidad</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EditForm;
