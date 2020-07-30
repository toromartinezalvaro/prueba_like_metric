import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';
import validateSelectedGroup from '../../../Shared/Validator';

const AvailableUnits = ({ units }) => {
  return <Widget title="Unidades disponibles">{units}</Widget>;
};

AvailableUnits.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  return {
    units:
      state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
        .units,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableUnits);
