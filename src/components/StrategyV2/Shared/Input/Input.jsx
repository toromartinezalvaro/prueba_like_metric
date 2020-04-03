import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';
import CurrencyFormat from './CurrencyFormat';
import PercentageFormat from './PercentageFormat';
import NumberFormat from './NumberFormat';

export const DEFAULT = 'default';
export const NUMBER = 'number';
export const CURRENCY = 'currency';
export const PERCENTAGE = 'percentage';

const variants = {
  default: {},
  number: {
    inputComponent: NumberFormat,
  },
  currency: {
    inputComponent: CurrencyFormat,
  },
  percentage: {
    inputComponent: PercentageFormat,
  },
};

const Input = ({ mask, field, form, ...rest }) => {
  const { name } = field;
  const fieldError = getIn(form.errors, name);
  const fieldTouch = getIn(form.touched, name);
  const error = fieldTouch && fieldError ? fieldError : null;
  return (
    <TextField
      {...field}
      {...rest}
      error={error}
      helperText={error}
      color="primary"
      InputProps={variants[mask]}
      variant="outlined"
    />
  );
};

Input.propTypes = {
  mask: PropTypes.oneOf([DEFAULT, NUMBER, CURRENCY, PERCENTAGE]),
};

Input.defaultMask = {
  mask: DEFAULT,
};

export default Input;
