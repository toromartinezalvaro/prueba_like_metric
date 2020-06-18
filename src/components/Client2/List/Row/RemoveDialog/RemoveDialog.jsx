import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function RemoveDialog({ acceptHandler }) {
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
        Desasociar
      </Button>
      <Dialog open={open}>
        <DialogTitle>Desasociar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta seguro que desea desasociar este cliente?
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
  acceptHandler: PropTypes.func.isRequired,
};

export default RemoveDialog;
