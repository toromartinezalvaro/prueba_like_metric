import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Widget from '../Shared/Widget';
import TotalSalesWidget from './TotalSalesWidget';
import ProjectedSalesWidget from './ProjectedSalesWidget';

const Widgets = ({ totalUnits, salesUnits, inventoryUnits, sales }) => {
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Totales">{totalUnits}</Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget
          title={`Unidades Vendidas a ${moment()
            .subtract(1, 'month')
            .endOf('month')
            .format('D [de] MMMM')}`}
        >
          {salesUnits}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget
          title={`Unidades Disponibles de ${moment()
            .startOf('month')
            .format('D [de] MMMM')} en adelante`}
        >
          {inventoryUnits}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <TotalSalesWidget />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Ventas realizadas">
          <NumberFormat
            value={Math.round(sales)}
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
  inventoryUnits: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory, total, sales } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    totalUnits: total.units,
    salesUnits: sales.units,
    inventoryUnits: inventory.units,
    sales: sales.sales,
  };
};

export default connect(mapStateToProps)(Widgets);
