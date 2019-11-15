/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 15th November 2019 4:57:15 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, InputAdornment } from '@material-ui/core';
import Styles from './Matrix.module.scss';
import Numbers from '../../../helpers/numbers';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const Matrix = (areaType, arrayAreaTypesHandler) => {
  let data = [];
  for (let i = 0; i < areaType.quantity; i += 1) {
    data = areaType.hola.map((area, j) => {
      return {
        nomenclature: (
          <div key={`nomenclature${j}`} className={Styles.ContainerTexField}>
            <TextField
              className={Styles.TextField}
              value={area.nomenclature}
              onChange={(e) => {
                arrayAreaTypesHandler(
                  areaType.id,
                  j,
                  'nomenclature',
                  e.target.value,
                );
              }}
            ></TextField>
          </div>
        ),
        measure: (
          <div key={`measure${j}`} className={Styles.ContainerTexField}>
            <TextField
              className={Styles.TextField}
              value={area.measure}
              onChange={(e) => {
                arrayAreaTypesHandler(
                  areaType.id,
                  j,
                  'measure',
                  e.target.value,
                );
              }}
            ></TextField>
          </div>
        ),
        price: (
          <div key={`price${j}`} className={Styles.ContainerTexField}>
            <TextField
              className={Styles.TextField}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              value={area.price}
              onChange={(e) => {
                arrayAreaTypesHandler(areaType.id, j, 'price', e.target.value);
              }}
            ></TextField>
          </div>
        ),
        total: (
          <span key={`total${j}`} className={Styles.Price}>
            <NumberFormat
              value={Numbers.toFixed(area.measure * area.price)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </span>
        ),
      };
    });
  }
  return data;
};

export default Matrix;
