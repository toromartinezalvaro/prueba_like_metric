import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Widget from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';
import validateSelectedGroup from '../../../Shared/Validator';

const Widgets = ({ percentage, strategy }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Widget title="Frecuencia de Incremento">{strategy}</Widget>
      </Grid>
      <Grid item xs={12} md={6}>
        <Widget title="Porcentaje de Incremento">
          {Numbers.toFixed(percentage * 100)}%
        </Widget>
      </Grid>
    </Grid>
  );
};

Widgets.propTypes = {
  percentage: PropTypes.number.isRequired,
  strategy: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  const { strategy, percentage } = state.strategy.root.strategyLines[
    state.strategy.root.selectedGroup
  ];
  return {
    percentage,
    strategy,
  };
};

export default connect(mapStateToProps)(Widgets);
