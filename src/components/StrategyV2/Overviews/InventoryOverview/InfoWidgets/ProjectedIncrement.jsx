import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Widget, { XS, SM } from '../../../Shared/Widget';
import { changeIncrement } from '../../../../../containers/StrategyV2/actions';
import Numbers from '../../../../../helpers/numbers';

const ProjectedIncrement = ({
  totalIncrement,
  salesIncrement,
  appliedIncrement,
  onIncrementChange,
  mini,
  field,
}) => {
  const projectedIncrement = useMemo(() => {
    return totalIncrement - salesIncrement - appliedIncrement;
  }, [totalIncrement, salesIncrement, appliedIncrement]);

  const incrementChangeHandler = (event) => {
    onIncrementChange(Number(event.target.value));
  };

  return (
    <Widget title="Incremento proyectado" size={mini ? XS : SM}>
      {field ? (
        <TextField
          label="Incremento"
          placeholder="1.3"
          value={projectedIncrement}
          onChange={incrementChangeHandler}
          variant="outlined"
        />
      ) : (
        <NumberFormat
          value={Numbers.toFixed(projectedIncrement)}
          displayType="text"
          prefix="$"
          thousandSeparator
        />
      )}
    </Widget>
  );
};

ProjectedIncrement.propTypes = {
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  onIncrementChange: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  field: PropTypes.bool,
};

ProjectedIncrement.defaultProps = {
  mini: false,
  field: false,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    appliedIncrement: inventory.appliedIncrement,
  };
};

const mapDispatchToProps = {
  onIncrementChange: changeIncrement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectedIncrement);
