import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const Sales = ({
  l0,
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  projected,
}) => {
  const sales = projected
    ? l0 + totalIncrement - salesIncrement
    : l0 + appliedIncrement;
  return (
    <Widget key="DetailInv-IncrementRate" title="Ventas" size={SM}>
      <NumberFormat
        value={Numbers.toFixed(sales)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

Sales.propTypes = {
  l0: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  projected: PropTypes.bool,
};

Sales.defaultProps = {
  projected: false,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    l0: inventory.l0,
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
  };
};

export default connect(mapStateToProps)(Sales);
