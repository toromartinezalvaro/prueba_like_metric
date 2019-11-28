/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 28th November 2019 9:34:00 am
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
    />
  );
}

const Matrix = (
  areaType,
  actualValue,
  arrayAreaTypesHandler,
  addAreaAdditionalHandler,
  updateAreaAdditionalHandler,
  actualValueHandler,
  index,
) => {
  let data = [];
  for (let i = 0; i < areaType.quantity; i += 1) {
    data = areaType.formatedAreas.map((area, j) => {
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
              onFocus={(e) => {
                actualValueHandler(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value && e.target.value !== actualValue) {
                  if (area.id) {
                    updateAreaAdditionalHandler(
                      e.target.value,
                      area.measure,
                      area.price,
                      area.id,
                    );
                  } else {
                    addAreaAdditionalHandler(
                      e.target.value,
                      0,
                      0,
                      areaType.id,
                      index,
                      j,
                    );
                  }
                }
              }}
            ></TextField>
          </div>
        ),
        measure: (
          <div key={`measure${j}`} className={Styles.ContainerTexField}>
            <TextField
              className={Styles.TextField}
              value={area.measure}
              type={'number'}
              onChange={(e) => {
                arrayAreaTypesHandler(
                  areaType.id,
                  j,
                  'measure',
                  e.target.value,
                );
              }}
              onFocus={(e) => {
                actualValueHandler(e.target.value);
              }}
              onBlur={(e) => {
                if (
                  Number(e.target.value) > 0 &&
                  e.target.value !== actualValue
                ) {
                  if (area.id) {
                    updateAreaAdditionalHandler(
                      area.nomenclature,
                      e.target.value,
                      area.price,
                      area.id,
                    );
                  } else {
                    addAreaAdditionalHandler(
                      '',
                      e.target.value,
                      0,
                      areaType.id,
                      index,
                      j,
                    );
                  }
                } else {
                  arrayAreaTypesHandler(areaType.id, j, 'measure', actualValue);
                }
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
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={area.price}
              onChange={(e) => {
                arrayAreaTypesHandler(areaType.id, j, 'price', e.target.value);
              }}
              onFocus={(e) => {
                actualValueHandler(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value !== '0' && e.target.value !== actualValue) {
                  if (area.id) {
                    updateAreaAdditionalHandler(
                      area.nomenclature,
                      area.measure,
                      e.target.value,
                      area.id,
                    );
                  } else {
                    addAreaAdditionalHandler(
                      '',
                      0,
                      e.target.value,
                      areaType.id,
                      index,
                      j,
                    );
                  }
                }
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
