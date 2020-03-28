import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CurrencyFormat from './CurrencyFormat';
import PercentageFormat from './PercentageFormat';

export const CURRENCY = 'currency';
export const PERCENTAGE = 'percentage';

const Input = ({ mask, ...rest }) => {
  return (
    <TextField
      {...rest}
      color="primary"
      InputProps={{
        inputComponent: mask === CURRENCY ? CurrencyFormat : PercentageFormat,
      }}
      variant="outlined"
    />
  );
};

Input.propTypes = {
  mask: PropTypes.oneOf([CURRENCY, PERCENTAGE]),
};

export default Input;
