import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ExtraFees = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Fecha hoy</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{moment().format('MMM-YY')}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Fecha Fin de construcción</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{moment().format('MMM-YY')}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Meses para entrega</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>9</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Plazo Pago CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>36 Meses</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Meses Disfrute CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>27</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExtraFees;
