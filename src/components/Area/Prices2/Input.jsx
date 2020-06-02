import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ field, ...rest }) => {
  return <TextField {...field} {...rest} color="primary" />;
};

export default Input;
