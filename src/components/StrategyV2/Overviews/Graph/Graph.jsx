import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chart from './Chart';
import Controls from './Controls';
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
        <Controls />
      </Grid>
    </Grid>
  );
};

export default Graph;
