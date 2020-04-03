import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AveragePrice from './AveragePrice';
import EARate from './EARate';

const Market = () => {
  return (
    <Paper>
      <Box p={3}>
        <Box mb={2}>
          <Typography variant="h5">Mercado</Typography>
        </Box>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12}>
            <AveragePrice />
          </Grid>
          <Grid item xs={12}>
            <EARate />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Market;
