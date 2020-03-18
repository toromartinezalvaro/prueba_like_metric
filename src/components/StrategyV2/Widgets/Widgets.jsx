import React from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from './Widget';

const Widgets = () => {
  return (
    <Grid container justify="space-between" spacing={3}>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
    </Grid>
  );
};

export default Widgets;
