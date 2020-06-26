import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget from '../../../Shared/Widget';

const CurrentMonthSales = ({ sales }) => {
  return (
    <Widget title="Valor promedio">
      <NumberFormat
        value={Number(sales).toFixed(0)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

CurrentMonthSales.propTypes = {
  sales: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  sales:
    state.strategy.root.groups[state.strategy.root.selectedGroup]
      .averagePricePerMt2WhenStrategyWasSelected,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentMonthSales);
