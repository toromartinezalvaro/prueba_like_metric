import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { XS, SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const InventoryRotation = ({ totalUnits, salesUnits, saleSpeed, mini }) => {
  const units = totalUnits - salesUnits;
  return (
    <Widget title="Rotacion de intentario" size={mini ? XS : SM}>
      {Numbers.toFixed(units / saleSpeed)}
    </Widget>
  );
};

InventoryRotation.propTypes = {
  totalUnits: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  mini: PropTypes.bool,
};

InventoryRotation.defaultProps = {
  mini: false,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    totalUnits: total.units,
    salesUnits: sales.units,
    saleSpeed: inventory.saleSpeed,
  };
};

export default connect(mapStateToProps)(InventoryRotation);
