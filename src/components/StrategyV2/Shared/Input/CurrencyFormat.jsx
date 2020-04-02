import React from 'react';
import NumberFormat from 'react-number-format';

const CurrencyFormat = ({ inputRef, name, onChange, ...other }) => {
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

export default CurrencyFormat;
