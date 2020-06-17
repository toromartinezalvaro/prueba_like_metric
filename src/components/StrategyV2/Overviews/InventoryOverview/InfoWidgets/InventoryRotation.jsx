import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Widget, { XS, SM, MD } from '../../../Shared/Widget';
import { MAIN_VIEW } from '../../reducer';

const InventoryRotation = ({
  rotationMonths,
  initialFee,
  mini,
  objective,
  futureRotationMonths,
}) => {
  return (
    <Widget
      title={
        objective ? 'Rotacion de inventario objetivo' : 'Rotacion de inventario'
      }
      size={mini ? XS : MD}
    >
      {objective ? futureRotationMonths : rotationMonths}
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
  objective: PropTypes.bool,
  futureRotationMonths: PropTypes.number.isRequired,
};

InventoryRotation.defaultProps = {
  mini: false,
  objective: false,
};

const mapStateToProps = (state) => {
  const { inventory, initialFee } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];

  return {
    futureRotationMonths: inventory.futureRotationMonths,
    rotationMonths: inventory.rotationMonths,
    initialFee,
  };
};

export default connect(mapStateToProps)(InventoryRotation);
