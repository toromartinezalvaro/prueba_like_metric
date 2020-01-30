import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Input = ({ params }) => {
  return (
    <TextField
      {...params}
      label="Buscar cliente"
      variant="outlined"
      fullWidth
    />
  );
};

Input.propTypes = {};

export default Input;
