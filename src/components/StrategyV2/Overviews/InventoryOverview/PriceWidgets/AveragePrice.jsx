import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const AveragePrice = ({
  l0,
  totalUnits,
  totalIncrement,
  salesUnits,
  salesIncrement,
  appliedIncrement,
  projected,
}) => {
  const sales = projected
    ? l0 + totalIncrement - salesIncrement
    : l0 + appliedIncrement;
  const units = totalUnits - salesUnits;
  const averagePrice = sales / units;
  return (
    <Widget key="DetailInv-AverageSales" title="Precio promedio" size={SM}>
      <NumberFormat
        value={Numbers.toFixed(averagePrice)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

AveragePrice.propTypes = {
  l0: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  projected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    l0: inventory.l0,
    totalUnits: total.units,
    totalIncrement: total.increment,
    salesUnits: sales.units,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
  };
};

export default connect(mapStateToProps)(AveragePrice);
