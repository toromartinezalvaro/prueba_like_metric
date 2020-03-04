/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Thursday, 27th February 2020 4:42:08 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@material-ui/core';
import Styles from './Market.module.scss';

function NumberFormatCustomPecentage(props) {
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
      isNumericString
      suffix="%"
    />
  );
}

function NumberFormatCustomPrice(props) {
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

function handleKeyPress(e) {
  if (e.keyCode === 13) {
    e.target.blur();
  }
}

const Market = (props) => {
  const [tempAveragePrice, setTempAveragePrice] = useState();
  const [
    tempAnnualEffectiveIncrement,
    setTempAnnualEffectiveIncrement,
  ] = useState();

  function changeMarketAveragePrice(value) {
    setTempAveragePrice(value);
  }

  function changeMarketAnnualEffectiveIncrement(value) {
    setTempAnnualEffectiveIncrement(value);
  }

  const {
    id,
    averagePrice,
    anualEffectiveIncrement,
    putMarketAveragePrice,
    putMarketAnnualEffectiveIncrement,
  } = props;
  return (
    <Card classes={{ root: Styles.Container }}>
      <CardContent classes={{ root: Styles.Content }}>
        <h4 className={Styles.h4}>Mercado</h4>
        <TextField
          label="Precio Promedio"
          size="small"
          value={tempAveragePrice || averagePrice || ''}
          onChange={(e) => changeMarketAveragePrice(e.target.value)}
          InputProps={{
            inputComponent: NumberFormatCustomPrice,
          }}
          onBlur={(e) => {
            const averagePriceFormated = Number(
              e.target.value.replace(/,/g, '').substring(1),
            );
            if (averagePrice !== averagePriceFormated) {
              putMarketAveragePrice(id, averagePriceFormated);
            }
          }}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <TextField
          label="E.A."
          size="small"
          value={
            tempAnnualEffectiveIncrement || anualEffectiveIncrement * 100 || ''
          }
          onChange={(e) => changeMarketAnnualEffectiveIncrement(e.target.value)}
          InputProps={{
            inputComponent: NumberFormatCustomPecentage,
          }}
          onBlur={(e) => {
            const annualEffectiveIncrementFormated = Number(
              e.target.value.slice(0, -1) / 100,
            );
            console.log(
              anualEffectiveIncrement,
              annualEffectiveIncrementFormated,
            );
            if (anualEffectiveIncrement !== annualEffectiveIncrementFormated) {
              putMarketAnnualEffectiveIncrement(
                id,
                e.target.value.slice(0, -1),
              );
            }
          }}
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </CardContent>
    </Card>
  );
};

Market.propTypes = {
  id: PropTypes.number,
  averagePrice: PropTypes.number,
  anualEffectiveIncrement: PropTypes.number,
  putMarketAveragePrice: PropTypes.func,
  putMarketAnnualEffectiveIncrement: PropTypes.func,
  changeMarketAveragePrice: PropTypes.func,
  changeMarketAnnualEffectiveIncrement: PropTypes.func,
};

export default Market;
