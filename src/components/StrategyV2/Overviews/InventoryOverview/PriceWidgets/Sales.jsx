import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const Sales = ({ projected, salesProjected, salesToToday }) => {
  const sales = projected ? salesProjected : salesToToday;
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
  salesProjected: PropTypes.number.isRequired,
  salesToToday: PropTypes.number.isRequired,
  projected: PropTypes.bool,
};

Sales.defaultProps = {
  projected: false,
};

const mapStateToProps = (state) => {
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    salesProjected: inventory.salesProjected,
    salesToToday: inventory.salesToToday,
  };
};

export default connect(mapStateToProps)(Sales);
