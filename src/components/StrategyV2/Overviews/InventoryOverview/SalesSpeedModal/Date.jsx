import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Widget from '../../../Shared/Widget';
import validateSelectedGroup from '../../../Shared/Validator';

const Date = ({ date }) => {
  return (
    <Widget title="Fecha estrategia">
      {moment(Number(date)).format('D MMMM YYYY')}
    </Widget>
  );
};

Date.propTypes = {
  date: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  return {
    date:
      state.strategy.root.groups[state.strategy.root.selectedGroup]
        .strategySelectionMonth,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Date);
