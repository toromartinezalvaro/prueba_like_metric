import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { SM, XS } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const AppliedIncrement = ({ appliedIncrement, mini }) => {
  return (
    <Widget title="Incremento aplicado en Inv" size={mini ? XS : SM}>
      <NumberFormat
        value={Number(appliedIncrement).toFixed(0)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

AppliedIncrement.propTypes = {
  appliedIncrement: PropTypes.number.isRequired,
  mini: PropTypes.bool,
};

AppliedIncrement.defaultProps = {
  mini: false,
};

const mapStateToProps = (state) => ({
  appliedIncrement:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .appliedIncrement,
});

export default connect(mapStateToProps)(AppliedIncrement);
