/*
 * Created Date: Wednesday November 13th 2019
 * Author: Caraham
 * -----
 * Last Modified: Friday, 29th November 2019 3:24:14 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import Styles from './Matrix.module.scss';
import Numbers from '../../../helpers/numbers';
import TextField from './TextField/TextField';
import { InputAdornment } from '@material-ui/core';

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
  const onBlurNomenclature = (e, area, j) => {
    if (e.target.value && e.target.value !== actualValue) {
      if (area.id) {
        updateAreaAdditionalHandler(
          e.target.value,
          area.measure,
          area.price,
          area.id,
        );
      } else {
        addAreaAdditionalHandler(e.target.value, 0, '0', areaType.id, index, j);
      }
    }
  };

  const onBlurMeasure = (e, area, j) => {
    if (Number(e.target.value) > 0 && e.target.value !== actualValue) {
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
          '0',
          areaType.id,
          index,
          j,
        );
      }
    } else {
      arrayAreaTypesHandler(areaType.id, j, 'measure', actualValue);
    }
  };

  const onBlurPrice = (e, area, j) => {
    if (e.target.value !== '0' && e.target.value !== actualValue) {
      if (area.id) {
        updateAreaAdditionalHandler(
          area.nomenclature,
          area.measure,
          e.target.value,
          area.id,
        );
      } else {
        addAreaAdditionalHandler('', 0, e.target.value, areaType.id, index, j);
      }
    }
  };

  const data = areaType.formatedAreas.map((area, j) => {
    return {
      nomenclature: (
        <TextField
          key={`nomenclature${j}`}
          value={area.nomenclature}
          typeOfTextField={'number'}
          onBlur={(e) => onBlurNomenclature(e, area, j)}
          arrayAreaTypesHandler={(id, value) =>
            arrayAreaTypesHandler(id, j, 'nomenclature', value)
          }
          actualValueHandler={(value) => actualValueHandler(value)}
          areaType={areaType}
        />
      ),
      measure: (
        <TextField
          key={`measure${j}`}
          value={area.measure}
          typeOfTextField={'number'}
          onBlur={(e) => onBlurMeasure(e, area, j)}
          arrayAreaTypesHandler={(id, value) =>
            arrayAreaTypesHandler(id, j, 'measure', value)
          }
          actualValueHandler={(value) => actualValueHandler(value)}
          areaType={areaType}
        />
      ),
      price: (
        <TextField
          key={`price${j}`}
          value={area.price}
          typeOfTextField={'number'}
          InputProps={{
            inputComponent: NumberFormatCustom,
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onBlur={(e) => onBlurPrice(e, area, j)}
          arrayAreaTypesHandler={(id, value) =>
            arrayAreaTypesHandler(id, j, 'price', value)
          }
          actualValueHandler={(value) => actualValueHandler(value)}
          areaType={areaType}
        />
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

  return data;
};

export default Matrix;
