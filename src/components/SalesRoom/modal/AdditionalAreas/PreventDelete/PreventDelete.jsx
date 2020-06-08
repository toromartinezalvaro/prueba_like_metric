import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PreventDelete = ({ open, handleClose, actionDelete, areaForDelete }) => {
  const handleDelete = () => {
    actionDelete(areaForDelete);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Atención</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estas seguro que quieres eliminar esta área?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PreventDelete.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  actionDelete: PropTypes.func,
  areaForDelete: PropTypes.object,
};

export default PreventDelete;
