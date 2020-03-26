import React from 'react';
import Grid from '@material-ui/core/Grid';
import Market from './Market';
import Strategies from './Strategies';

const Controls = () => {
  return (
    <Grid container alignItems="stretch" spacing={3}>
      <Grid item xs={12} lg={3}>
        <Market />
      </Grid>
      <Grid item xs={12} lg={9}>
        <Strategies />
      </Grid>
    </Grid>
  );
};

export default Controls;
