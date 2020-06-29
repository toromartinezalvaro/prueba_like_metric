import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';

const AvailableUnits = ({ units }) => {
  return <Widget title="Unidades disponibles">{units}</Widget>;
};

AvailableUnits.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  units:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .units,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableUnits);
