import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';

const PricePerM2 = ({
  projected,
  baseValuePerM2Projected,
  baseValuePerM2ToToday,
}) => {
  const pricePerM2 = projected
    ? baseValuePerM2Projected
    : baseValuePerM2ToToday;
  return (
    <Widget key="DetailInv-M2Price" title="Valor m²" size={SM}>
      <NumberFormat
        value={Math.round(pricePerM2)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

PricePerM2.propTypes = {
  projected: PropTypes.bool.isRequired,
  baseValuePerM2Projected: PropTypes.number.isRequired,
  baseValuePerM2ToToday: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    baseValuePerM2Projected: inventory.baseValuePerM2Projected,
    baseValuePerM2ToToday: inventory.baseValuePerM2ToToday,
  };
};

export default connect(mapStateToProps)(PricePerM2);
