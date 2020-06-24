import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function RemoveDialog({ allowDelete, acceptHandler }) {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="secondary" variant="contained" onClick={openHandler}>
        {allowDelete ? 'Eliminar' : 'Desasociar'}
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          {allowDelete ? 'Eliminar' : 'Desasociar'} cliente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta seguro que desea {allowDelete ? 'Eliminar' : 'Desasociar'} este
            cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" size="small" onClick={acceptHandler}>
            Aceptar
          </Button>
          <Button color="secondary" size="small" onClick={closeHandler}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

RemoveDialog.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  acceptHandler: PropTypes.func.isRequired,
};

export default RemoveDialog;
