import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Input = ({ params, onChangeHandler }) => {
  return (
    <TextField
      {...params}
      label="Buscar cliente"
      variant="outlined"
      onChange={onChangeHandler}
      fullWidth
    />
  );
};

Input.propTypes = {
  params: PropTypes.object,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Input;
