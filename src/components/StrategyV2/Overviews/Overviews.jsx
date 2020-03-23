import React from 'react';
import Grid from '@material-ui/core/Grid';
import TotalOverview from './TotalOverview';
import SalesOverview from './SalesOverview';
import InventoryOverview from './InventoryOverview';

const Overviews = () => {
  return (
    <Grid container justify="space-around">
      <Grid item md={3}>
        <TotalOverview />
      </Grid>
      <Grid item md={3}>
        <SalesOverview />
      </Grid>
      <Grid item md={3}>
        <InventoryOverview />
      </Grid>
    </Grid>
  );
};

export default Overviews;
