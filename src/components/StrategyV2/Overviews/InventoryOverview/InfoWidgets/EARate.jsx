import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const EARateWidget = ({ EARate, EARateSelected, objective }) => {
  const currentEARate = objective ? EARate : EARateSelected;
  return (
    <Widget
      title={
        objective
          ? 'Tasa Incremento e.a objetivo'
          : 'Tasa Incremento e.a inventario'
      }
      size={SM}
    >
      {Numbers.toFixed(currentEARate * 100)}%
    </Widget>
  );
};

EARateWidget.propTypes = {
  EARate: PropTypes.number.isRequired,
  EARateSelected: PropTypes.number.isRequired,
  objective: PropTypes.bool,
};

EARateWidget.defaultProps = {
  objective: false,
};

const mapStateToProps = (state) => {
  const groupSelected =
    state.strategy.root.groups[state.strategy.root.selectedGroup];
  const { strategy, inventory } = groupSelected;
  const strategyLines =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  const lines = strategyLines ? strategyLines.strategies : [];
  const currentStrategy = lines.filter((line) => line.id === strategy);
  console.log(currentStrategy);

  return {
    EARate: inventory.EARate,
    EARateSelected: currentStrategy.EArate,
  };
};

export default connect(mapStateToProps)(EARateWidget);
