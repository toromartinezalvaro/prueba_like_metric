import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget from '../../../Shared/Widget';
import validateSelectedGroup from '../../../Shared/Validator';

const AveragePrice = ({ sales }) => {
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

AveragePrice.propTypes = {
  sales: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  return {
    sales: (
      state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
        .objective || { averagePrice: 0 }
    ).averagePrice,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AveragePrice);
