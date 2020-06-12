import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PreventAction = ({ open, handleClose, action, data }) => {
  const handleAction = () => {
    action(data);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Atención</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción reiniciará las estrategias ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAction} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PreventAction.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  action: PropTypes.func,
  data: PropTypes.object,
};

export default PreventAction;
