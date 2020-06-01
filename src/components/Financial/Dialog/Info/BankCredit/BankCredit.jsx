import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from './Dialog';

const BankCredit = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Crédito Banco</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$ 231,569,947</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Cuota Mes Banco</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$ 2,309,073</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Dialog />
      </Box>
    </>
  );
};

export default BankCredit;
