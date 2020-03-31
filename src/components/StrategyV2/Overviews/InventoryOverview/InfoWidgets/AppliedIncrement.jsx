import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Widget, { XS } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const AppliedIncrement = ({ appliedIncrement }) => {
  return (
    <Widget title="Incremento aplicado en Inv" size={XS}>
      <NumberFormat
        value={Numbers.toFixed(appliedIncrement)}
        displayType="text"
        prefix="$"
        thousandSeparator
      />
    </Widget>
  );
};

AppliedIncrement.propTypes = {
  appliedIncrement: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  appliedIncrement:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .appliedIncrement,
});

export default connect(mapStateToProps)(AppliedIncrement);
