import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Dialog = ({ open, request, acceptHandler, rejectHandler }) => {
  const { name, nomenclature, property } = request;
  console.log(JSON.stringify(request));
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
        <Button onClick={acceptHandler} size="small" color="primary">
          Aceptar
        </Button>
        <Button onClick={rejectHandler} size="small" color="secondary">
          Rechazar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  request: PropTypes.shape({
    name: PropTypes.string,
    nomenclature: PropTypes.string,
    property: PropTypes.string,
  }),
  acceptHandler: PropTypes.func.isRequired,
  rejectHandler: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  open: false,
  request: {
    name: 'PropTypes.string',
    nomenclature: 'PropTypes.string',
    property: 'PropTypes.string',
  },
};

export default Dialog;
