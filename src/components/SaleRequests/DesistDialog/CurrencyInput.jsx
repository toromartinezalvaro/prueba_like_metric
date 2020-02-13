import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const Format = ({ inputRef, name, onChange, ...other }) => {
  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
};

const CurrencyInput = ({ field, ...rest }) => {
  return (
    <TextField
      {...field}
      {...rest}
      variant="outlined"
      color="primary"
      InputProps={{
        inputComponent: Format,
      }}
    />
  );
};

export default CurrencyInput;
