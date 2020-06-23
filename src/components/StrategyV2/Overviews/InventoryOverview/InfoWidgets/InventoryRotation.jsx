import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Widget, { XS, SM, MD, Type } from '../../../Shared/Widget';
import { MAIN_VIEW } from '../../reducer';

const InventoryRotation = ({
  rotationMonths,
  initialFee,
  mini,
  type,
  futureRotationMonths,
  salesRotationMonths,
}) => {
  let months = 0;
  let title = '';

  switch (type) {
    case Type.objetive:
      months = futureRotationMonths;
      title = 'Rotación de inventario objetivo';
      break;
    case Type.real:
      months = salesRotationMonths;
      title = 'Rotación de inventario real';
      break;
    default:
      months = rotationMonths;
      title = 'Rotación de inventario';
      break;
  }
  return (
    <Widget title={title} size={mini ? XS : MD}>
      {months}
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
  futureRotationMonths: PropTypes.number.isRequired,
  salesRotationMonths: PropTypes.number.isRequired,
  type: PropTypes.string,
};

InventoryRotation.defaultProps = {
  mini: false,
};

const mapStateToProps = (state) => {
  const { inventory, initialFee, sales } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];

  return {
    futureRotationMonths: inventory.futureRotationMonths,
    rotationMonths: inventory.rotationMonths,
    salesRotationMonths: sales.rotationMonths,
    initialFee,
  };
};

export default connect(mapStateToProps)(InventoryRotation);
