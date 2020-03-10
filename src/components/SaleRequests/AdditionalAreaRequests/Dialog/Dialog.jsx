import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Dialog = ({ open, name, nomenclature, property }) => {
  return (
    <MuiDialog open={open}>
      <DialogTitle>Solicitud pendiente para {nomenclature}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Qué desea hacer para el desistimiento del area {name} -{' '}
          {nomenclature} de la propiedad {property}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Aceptar</Button>
        <Button color="secondary">Rechazar</Button>
      </DialogActions>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  name: PropTypes.string.isRequired,
  nomenclature: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
};

Dialog.defaultProps = {
  open: false,
};

export default Dialog;
