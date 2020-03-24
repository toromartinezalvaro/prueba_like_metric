/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 13th December 2019 10:55:11 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import TextFieldMaterial from '@material-ui/core/TextField';
import Styles from './TextField.module.scss';

const TextField = (props) => {
  const {
    key,
    id,
    onBlur,
    typeTextField,
    InputProps,
    value,
    arrayAreaTypesHandler,
    actualValueHandler,
    areaType,
  } = props;

  const [error, setError] = useState(false);

  return (
    <div key={key} className={Styles.ContainerTexField}>
      <TextFieldMaterial
        size="small"
        error={error}
        helperText={error ? 'Debe ingresar un número valido' : ''}
        value={value}
        type={typeTextField}
        InputProps={InputProps}
        onChange={(e) => {
          arrayAreaTypesHandler(areaType.id, e.target.value);
        }}
        onFocus={(e) => {
          actualValueHandler(e.target.value);
        }}
        onBlur={(e) => {
          onBlur(e, error);
        }}
        {...props}
      />
    </div>
  );
};

export default TextField;
