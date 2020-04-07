import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const EARateWidget = ({ EARate }) => {
  return (
    <Widget title="Tasa Incremento e.a Proyectada" size={SM}>
      {Numbers.toFixed(EARate * 100)}%
    </Widget>
  );
};

EARateWidget.propTypes = {
  EARate: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  EARate:
    state.strategy.root.groups[state.strategy.root.selectedGroup].inventory
      .EARate,
});

export default connect(mapStateToProps)(EARateWidget);
