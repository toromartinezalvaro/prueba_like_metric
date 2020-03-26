import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Widget from '../Shared/Widget';
import TotalSalesWidget from './TotalSalesWidget';
import ProjectedSalesWidget from './ProjectedSalesWidget';
import Context from '../../../containers/StrategyV2/context';

const Widgets = () => {
  const { state } = useContext(Context);

  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Totales">{state.data.total.units}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Vendidas">{state.data.soldUnits}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Disponibles">
          {state.data.total.units - state.data.soldUnits}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <TotalSalesWidget />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Ventas realizadas">
          <NumberFormat
            value={state.data.sales}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <ProjectedSalesWidget />
      </Grid>
    </Grid>
  );
};

export default Widgets;
