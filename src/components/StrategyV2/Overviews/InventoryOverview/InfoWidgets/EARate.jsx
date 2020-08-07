import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget, { SM, Type } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';
import validateSelectedGroup from '../../../Shared/Validator';

const EARateWidget = ({ EARate, EARateSelected, salesEARate, type, hide }) => {
  let currentEARate = 0;
  let title = '';

  switch (type) {
    case Type.objetive:
      currentEARate = EARateSelected;
      title = 'Tasa Incremento e.a objetivo';
      break;
    case Type.real:
      currentEARate = salesEARate;
      title = 'Tasa Incremento real';
      break;
    default:
      currentEARate = EARate;
      title = 'Tasa Incremento e.a inventario';
      break;
  }
  return (
    <>
      {!hide && (
        <Widget title={title} size={SM}>
          {Numbers.toFixed(currentEARate * 100)}%
        </Widget>
      )}
    </>
  );
};

EARateWidget.propTypes = {
  EARate: PropTypes.number.isRequired,
  EARateSelected: PropTypes.number.isRequired,
  objective: PropTypes.bool,
  salesEARate: PropTypes.number.isRequired,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  const groupSelected =
    state.strategy.root.groups[state.strategy.root.selectedGroup];
  const { strategy, inventory, sales } = groupSelected;
  const strategyLines =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];
  const lines = strategyLines ? strategyLines.strategies : [];
  const currentStrategy = lines.find((line) => line.id === strategy && line.id);

  console.log(sales.EARate);

  return {
    EARate: inventory.EARate,
    EARateSelected: currentStrategy ? currentStrategy.EARate : 0,
    salesEARate: sales.EARate,
  };
};

export default connect(mapStateToProps)(EARateWidget);
