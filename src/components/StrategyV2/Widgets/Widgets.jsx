import React from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from './Widget';

const Widgets = () => {
  return (
    <Grid container justify="space-between" spacing={3}>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
      <Grid item xs={2}>
        <Widget title="Unidades Totales" value={10} />
      </Grid>
    </Grid>
  );
};

export default Widgets;
