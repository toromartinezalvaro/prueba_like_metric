import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { MD } from '../../../Shared/Widget';

const InitialFee = ({ initialFee }) => {
  return (
    <div>
      <Widget title="Plazo cuota incial" size={MD}>
        {initialFee}
      </Widget>
    </div>
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
