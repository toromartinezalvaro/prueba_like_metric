/*
 * Created Date: Friday November 29th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 3:03:08 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import TextFieldMaterial from '@material-ui/core/TextField';
import Styles from './TextField.module.scss';

const TextField = (props) => {
  const {
    key,
    onBlur,
    typeTextField,
    InputProps,
    value,
    arrayAreaTypesHandler,
    actualValueHandler,
    areaType,
  } = props;

  return (
    <div key={key} className={Styles.ContainerTexField}>
      <TextFieldMaterial
        className={Styles.TextField}
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
          onBlur(e);
        }}
      />
    </div>
  );
};

export default TextField;
