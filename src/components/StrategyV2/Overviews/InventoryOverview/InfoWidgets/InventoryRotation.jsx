import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Widget, { XS, SM } from '../../../Shared/Widget';
import Numbers from '../../../../../helpers/numbers';

const InventoryRotation = ({ rotationMonths, initialFee, mini }) => {
  return (
    <Widget title="Rotacion de inventario" size={mini ? XS : SM}>
      {Numbers.toFixed(rotationMonths)}
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
    rotationMonths: inventory.rotationMonths,
    initialFee,
  };
};

export default connect(mapStateToProps)(InventoryRotation);
