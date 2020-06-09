import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RemoveDialog = ({ isOpen, removeArea, handleClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Atención.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas borrar este apareamiento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={removeArea} color="primary" autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RemoveDialog.propTypes = {
  isOpen: PropTypes.bool,
  removeArea: PropTypes.func,
  handleClose: PropTypes.func,
};

export default RemoveDialog;
