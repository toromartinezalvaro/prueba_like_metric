import React from 'react';
import Grid from '@material-ui/core/Grid';
import TotalOverview from './TotalOverview';

const Overviews = () => {
  return (
    <Grid container>
      <Grid item md={3}>
        <TotalOverview />
      </Grid>
      <Grid item md={3}>
        Ventido
      </Grid>
      <Grid item md={3}>
        Inventario
      </Grid>
    </Grid>
  );
};

export default Overviews;
