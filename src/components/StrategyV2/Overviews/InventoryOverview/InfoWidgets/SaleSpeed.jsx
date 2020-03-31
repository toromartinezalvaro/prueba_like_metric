import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Widget, { SM } from '../../../Shared/Widget';
import { changeSaleSpeed } from '../../../../../containers/StrategyV2/actions';

const SaleSpeed = ({ saleSpeed, field, onSaleSpeedChange }) => {
  const changeSaleSpeedHandler = (event) => {
    onSaleSpeedChange(Number(event.target.value));
  };

  return (
    <Widget title="Velocidad de ventas" size={SM}>
      {field ? (
        <TextField
          label="Velocidad de ventas"
          placeholder="1.3"
          value={saleSpeed}
          onChange={changeSaleSpeedHandler}
          variant="outlined"
        />
      ) : (
        saleSpeed
      )}
    </Widget>
  );
};

SaleSpeed.propTypes = {
  saleSpeed: PropTypes.number.isRequired,
  onSaleSpeedChange: PropTypes.func.isRequired,
  field: PropTypes.bool,
};

SaleSpeed.defaultProps = {
  field: false,
};

const mapStateToProps = (state) => ({
  saleSpeed:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .saleSpeed,
});

const mapDispatchToProps = {
  onSaleSpeedChange: changeSaleSpeed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleSpeed);
