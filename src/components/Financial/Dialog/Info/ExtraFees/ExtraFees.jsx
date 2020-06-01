import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ExtraFees = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Total Cuotas Extras</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 50,000,000</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Primas</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ -</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Cesantías</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ -</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Otras Cuotas Extras</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 50,000,000</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExtraFees;
