import React from 'react';
import Grid from '@material-ui/core/Grid';
import Market from './Market';
import Strategies from './Strategies';
import ProjectedIncrement from '../../InventoryOverview/InfoWidgets/ProjectedIncrement';

const Controls = () => {
  return (
    <Grid container alignItems="stretch" spacing={3}>
      <Grid item xs={12}>
        <ProjectedIncrement field />
      </Grid>
      <Grid item xs={12}>
        <Strategies />
      </Grid>
      <Grid item xs={12}>
        <Market />
      </Grid>
    </Grid>
  );
};

export default Controls;
