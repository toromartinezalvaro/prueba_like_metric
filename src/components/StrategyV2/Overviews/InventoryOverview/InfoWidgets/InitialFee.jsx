import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { XS } from '../../../Shared/Widget';

const InitialFee = ({ initialFee }) => {
  return (
    <Widget title="Plazo cuota inciial" size={XS}>
      {initialFee}
    </Widget>
  );
};

InitialFee.propTypes = {
  initialFee: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  initialFee:
    state.strategy.root.groups[state.strategy.root.selectedGroup].initialFee,
});

export default connect(mapStateToProps)(InitialFee);
