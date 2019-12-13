/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 12th December 2019 4:29:01 pm
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
        error={error}
        helperText={error ? 'Tiene que ser un nombre unico' : ''}
        className={Styles.TextField}
        value={value}
        type={typeTextField}
        InputProps={InputProps}
        onChange={(e) => {
          const validation = areaType.formatedAreas.some(
            (formatedArea) =>
              formatedArea.nomenclature === e.target.value &&
              formatedArea.id !== id,
          );
          setError(validation);
          arrayAreaTypesHandler(areaType.id, e.target.value);
        }}
        onFocus={(e) => {
          actualValueHandler(e.target.value);
        }}
        onBlur={(e) => {
          onBlur(e, error);
        }}
      />
    </div>
  );
};

export default TextField;
