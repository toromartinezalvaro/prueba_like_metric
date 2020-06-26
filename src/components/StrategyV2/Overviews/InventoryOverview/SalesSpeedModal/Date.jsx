import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from '../../../Shared/Widget';

const Date = ({ date }) => {
  return <Widget title="Fecha estrategia">{date}</Widget>;
};

Date.propTypes = {
  date: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  date:
    state.strategy.root.groups[state.strategy.root.selectedGroup]
      .strateSelectionMonth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Date);
