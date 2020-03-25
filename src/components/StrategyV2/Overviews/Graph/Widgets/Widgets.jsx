import React from 'react';
import Grid from '@material-ui/core/Grid';
import Widget from '../../../Shared/Widget';

const Widgets = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Widget title="Frecuencia de Incremento">1</Widget>
      </Grid>
      <Grid item xs={12} md={6}>
        <Widget title="Porcentaje de Incremento">1%</Widget>
      </Grid>
    </Grid>
  );
};

export default Widgets;
