import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chart from './Chart';
import Widgets from './Widgets';
import Styles from './Graph.module.scss';

const Graph = () => {
  return (
    <Grid
      container
      direction="row"
      classes={{ root: Styles.container }}
      spacing={3}
    >
      <Grid item xs={12}>
        <Chart />
      </Grid>
      <Grid item xs={12}>
        <Widgets />
      </Grid>
    </Grid>
  );
};

export default Graph;
