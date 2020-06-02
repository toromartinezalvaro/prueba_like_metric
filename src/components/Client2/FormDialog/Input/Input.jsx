import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const Input = ({ error, touched, field, ...rest }) => {
  return (
    <Box mb={2}>
      <TextField
        error={error !== undefined && touched}
        {...field}
        {...rest}
        fullWidth
        variant="outlined"
        helperText={touched && error}
      />
    </Box>
  );
};

export default Input;
