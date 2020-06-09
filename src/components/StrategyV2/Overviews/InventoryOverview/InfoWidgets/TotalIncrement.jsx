import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const TotalIncrement = ({ totalIncrement }) => {
  return (
    <Widget title="Incremento inventario" size={SM}>
      <NumberFormat
        value={Number(totalIncrement).toFixed(0)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

TotalIncrement.propTypes = {
  totalIncrement: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    totalIncrement: inventory.totalIncrement,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TotalIncrement);
