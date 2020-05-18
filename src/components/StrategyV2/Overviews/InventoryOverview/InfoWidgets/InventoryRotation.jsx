import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Widget, { XS, SM } from '../../../Shared/Widget';
import { MAIN_VIEW } from '../../reducer';

const InventoryRotation = ({ rotationMonths, initialFee, mini }) => {
  return (
    <Widget title="Rotacion de inventario" size={mini ? XS : SM}>
      {rotationMonths}
      {rotationMonths > initialFee && (
        <Tooltip title="La rotacion de inventario supera el plazo de la cuota incial">
          <WarningRoundedIcon fontSize="small" color="secondary" />
        </Tooltip>
      )}
    </Widget>
  );
};

InventoryRotation.propTypes = {
  rotationMonths: PropTypes.number.isRequired,
  initialFee: PropTypes.number.isRequired,
  mini: PropTypes.bool,
};

InventoryRotation.defaultProps = {
  mini: false,
};

const mapStateToProps = (state) => {
  const { inventory, initialFee } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    rotationMonths:
      state.strategy.overviews.view === MAIN_VIEW
        ? inventory.rotationMonths
        : inventory.futureRotationMonths,
    initialFee,
  };
};

export default connect(mapStateToProps)(InventoryRotation);
