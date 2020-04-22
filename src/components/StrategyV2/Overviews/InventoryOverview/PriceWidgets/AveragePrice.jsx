import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const AveragePrice = ({ baseValueProjected, baseValueToToday, projected }) => {
  const averagePrice = projected ? baseValueProjected : baseValueToToday;

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
  baseValueProjected: PropTypes.number.isRequired,
  baseValueToToday: PropTypes.number.isRequired,
  projected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    baseValueProjected: inventory.baseValueProjected,
    baseValueToToday: inventory.baseValueToToday,
  };
};

export default connect(mapStateToProps)(AveragePrice);
