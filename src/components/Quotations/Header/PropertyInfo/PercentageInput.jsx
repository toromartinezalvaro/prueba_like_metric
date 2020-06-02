import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const Format = ({ inputRef, name, onChange, ...other }) => {
  return (
    <NumberFormat
      {...other}
      style={{ textAlign: 'center' }}
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
      suffix="%"
    />
  );
};

const PercentageInput = ({ field, ...rest }) => {
  return (
    <TextField
      style={{ width: '100px' }}
      {...field}
      {...rest}
      color="primary"
      InputProps={{
        inputComponent: Format,
      }}
    />
  );
};

export default PercentageInput;
