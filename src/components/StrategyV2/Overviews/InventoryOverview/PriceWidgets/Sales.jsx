import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const Sales = ({ sales }) => {
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
  sales: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  appliedIncrement:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .appliedIncrement,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sales);
