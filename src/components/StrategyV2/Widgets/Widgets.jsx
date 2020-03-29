import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Widget from '../Shared/Widget';
import TotalSalesWidget from './TotalSalesWidget';
import ProjectedSalesWidget from './ProjectedSalesWidget';

const Widgets = ({ groups, selectedGroup }) => {
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Totales">
          {groups[selectedGroup].total.units}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Vendidas">
          {groups[selectedGroup].sales.units}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Unidades Disponibles">
          {groups[selectedGroup].total.units -
            groups[selectedGroup].sales.units}
        </Widget>
      </Grid>
      <Grid item xs={12} lg={2}>
        <TotalSalesWidget />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Widget title="Ventas realizadas">
          <NumberFormat
            value={
              groups[selectedGroup].sales.l0 +
              groups[selectedGroup].sales.increment
            }
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
  groups: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.shape({ units: PropTypes.number }),
      sales: PropTypes.shape({
        units: PropTypes.number,
        l0: PropTypes.number,
        increment: PropTypes.number,
      }),
    }),
  ).isRequired,
  selectedGroup: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.strategy.root.groups,
  selectedGroup: state.strategy.settings.selectedGroup,
});

export default connect(mapStateToProps)(Widgets);
