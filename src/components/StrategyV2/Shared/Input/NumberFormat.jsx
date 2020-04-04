import React from 'react';
import ReactNumberFormat from 'react-number-format';

const NumberFormat = ({ inputRef, name, onChange, ...other }) => {
  return (
    <ReactNumberFormat
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
    />
  );
};

export default NumberFormat;
