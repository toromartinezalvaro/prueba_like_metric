import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';

const CurrentMonthSales = ({ units }) => {
  return <Widget title="Unidades vendidas mes actual">{units}</Widget>;
};

CurrentMonthSales.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  units:
    state.strategy.root.groups[state.strategy.root.selectedGroup]
      .unitsSoldThisMonth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentMonthSales);
