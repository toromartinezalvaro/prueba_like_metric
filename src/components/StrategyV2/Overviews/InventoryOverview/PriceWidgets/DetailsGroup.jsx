import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Sales from './Sales';
import AveragePrice from './AveragePrice';
import PricePerM2 from './PricePerM2';

export const DetailsGroup = () => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          component="span"
          display="block"
          align="center"
        >
          A hoy
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Sales />
      </Grid>
      <Grid item xs={12}>
        <AveragePrice />
      </Grid>
      <Grid item xs={12}>
        <PricePerM2 />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          component="span"
          display="block"
          align="center"
        >
          Proyectado
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Sales projected />
      </Grid>
      <Grid item xs={12}>
        <AveragePrice projected />
      </Grid>
      <Grid item xs={12}>
        <PricePerM2 projected />
      </Grid>
    </Grid>
  );
};

export default DetailsGroup;
