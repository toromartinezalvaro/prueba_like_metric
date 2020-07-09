import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';

const Units = ({ units }) => {
  return <Widget title="Inventario">{units}</Widget>;
};

Units.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  units: (
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .objective || { units: 0 }
  ).units,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Units);
