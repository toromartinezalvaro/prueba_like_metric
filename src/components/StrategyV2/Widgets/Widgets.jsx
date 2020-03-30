import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Widget from '../Shared/Widget';
import TotalSalesWidget from './TotalSalesWidget';
import ProjectedSalesWidget from './ProjectedSalesWidget';

const Widgets = ({ totalUnits, salesUnits, salesL0, salesIncrement }) => {
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Totales">{totalUnits}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Vendidas">{salesUnits}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Disponibles">{totalUnits - salesUnits}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <TotalSalesWidget />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Ventas realizadas">
          <NumberFormat
            value={salesL0 + salesIncrement}
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

Widgets.propTypes = {
  totalUnits: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  salesL0: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales } = state.strategy.root.groups[
    state.strategy.settings.selectedGroup
  ];
  return {
    totalUnits: total.units,
    salesUnits: sales.units,
    salesL0: sales.l0,
    salesIncrement: sales.increment,
  };
};

export default connect(mapStateToProps)(Widgets);
