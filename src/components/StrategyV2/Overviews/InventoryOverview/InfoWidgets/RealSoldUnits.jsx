import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';

const RealSoldUnits = ({ units }) => {
  return <Widget title="Unidades vendidas">{units}</Widget>;
};

RealSoldUnits.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  units:
    state.strategy.root.groups[state.strategy.root.selectedGroup].sales.units,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RealSoldUnits);
