/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 12th December 2019 3:25:06 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import Styles from './EditForm.module.scss';

const EditForm = (props) => {
  const [name, setName] = useState(props.areaType.name);
  const [unit, setUnit] = useState(props.areaType.unit);
  console.log('ESTE PROPS', props.areaType);
  return (
    <div className={Styles.DialogContainer}>
      <TextField
        required
        onChange={(e) => {
          setName(e.target.value);
          props.onChangeName(e);
        }}
        value={name}
        id="standard-required"
        label="Nombre"
        margin="normal"
      />
      <FormControl required>
        <InputLabel id="demo-simple-select-required-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
            props.handleChangeModal(e);
          }}
        >
          <MenuItem value={'MT2'}>mts²</MenuItem>
          <MenuItem value={'UNT'}>Unidad</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EditForm;
