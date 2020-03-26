import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Market = () => {
  return (
    <Paper>
      <Box p={3}>
        <Box mb={2}>
          <Typography variant="h5">Mercado</Typography>
        </Box>
        <Box>
          <TextField label="Precio promedio" placeholder="$5000000" fullWidth />
          <TextField label="E.A." placeholder="13%" fullWidth />
        </Box>
      </Box>
    </Paper>
  );
};

export default Market;
