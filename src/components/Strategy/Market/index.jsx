/*
 * Created Date: Thursday January 30th 2020
 * Author: Caraham
 * -----
 * Last Modified: Friday, 31st January 2020 4:55:41 pm
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from '@material-ui/core';
import Styles from './Market.module.scss';

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
      isNumericString
      suffix="%"
    />
  );
}

const Market = (props) => {
  const {
    id,
    averagePrice,
    anualEffectiveIncrement,
    putMarketAveragePrice,
    putMarketAnnualEffectiveIncrement,
    changeMarketAveragePrice,
    changeMarketAnnualEffectiveIncrement,
  } = props;
  return (
    <Card classes={{ root: Styles.Container }}>
      <CardContent classes={{ root: Styles.Content }}>
        <h4 className={Styles.h4}>Mercado</h4>
        <TextField
          label="Precio Promedio"
          size="small"
          value={averagePrice || ''}
          onChange={(e) => changeMarketAveragePrice(e.target.value)}
          onBlur={(e) =>
            averagePrice !== Number(e.target.value)
              ? putMarketAveragePrice(id, e.target.value)
              : null
          }
        />
        <TextField
          label="E.A."
          size="small"
          value={anualEffectiveIncrement ? anualEffectiveIncrement * 100 : ''}
          onChange={(e) =>
            changeMarketAnnualEffectiveIncrement(e.target.value / 100)
          }
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          onBlur={(e) =>
            anualEffectiveIncrement !== Number(e.target.value.slice(0, -1))
              ? putMarketAnnualEffectiveIncrement(
                  id,
                  e.target.value.slice(0, -1) / 100,
                )
              : null
          }
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
