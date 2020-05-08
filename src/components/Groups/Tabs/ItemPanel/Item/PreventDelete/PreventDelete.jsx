import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PreventDelete = ({ open, selectedValue, onClose }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ATENCIÓN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`¿Está seguro que desea elemininar?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleListItemClick(false)}>Cancelar</Button>
          <Button
            onClick={() => handleListItemClick(true)}
            color="primary"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PreventDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PreventDelete;
