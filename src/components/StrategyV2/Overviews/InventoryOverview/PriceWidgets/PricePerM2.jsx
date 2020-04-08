import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const PricePerM2 = ({
  l0,
  totalUnits,
  totalIncrement,
  salesUnits,
  salesIncrement,
  averageArea,
  appliedIncrement,
  projected,
}) => {
  const sales = projected
    ? l0 + totalIncrement - salesIncrement
    : l0 + appliedIncrement;
  const units = totalUnits - salesUnits;
  const averagePrice = sales / units;
  return (
    <Widget key="DetailInv-M2Price" title="Valor m²" size={SM}>
      <NumberFormat
        value={Numbers.toFixed(averagePrice / averageArea)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

PricePerM2.propTypes = {
  l0: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalIncrement: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
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
    averageArea: inventory.averageArea,
    appliedIncrement: inventory.appliedIncrement,
  };
};

export default connect(mapStateToProps)(PricePerM2);
