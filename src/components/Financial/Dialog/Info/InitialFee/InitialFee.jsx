import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const InitialFee = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 49,322,525</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Separación</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 2,000,000</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Cuota Mensual</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>$ 1,314,515</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Plazo Cuota Inicial</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>36 Meses</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InitialFee;
