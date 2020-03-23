import React from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from '../Shared/Widget';
import TotalSalesWidget from './TotalSalesWidget';
import ProjectedSalesWidget from './ProjectedSalesWidget'

const Widgets = () => {
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={3} sm={2}>
        <Widget title="Unidades Totales">10</Widget>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Widget title="Unidades Vendidas">5</Widget>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Widget title="Unidades Disponibles">5</Widget>
      </Grid>
      <Grid item xs={3} sm={2}>
        <TotalSalesWidget />
      </Grid>
      <Grid item xs={3} sm={2}>
        <Widget title="Ventas realizadas">510.1</Widget>
      </Grid>
      <Grid item xs={3} sm={2}>
        <ProjectedSalesWidget />
      </Grid>
    </Grid>
  );
};

export default Widgets;
