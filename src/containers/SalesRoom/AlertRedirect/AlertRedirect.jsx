import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertRedirect = ({ open, message, route, handleClose }) => {
  const history = useHistory();
  const gotoUrl = (URL) => () => {
    history.push(URL);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Atención</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={gotoUrl(route)} color="primary" autoFocus>
            Ir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AlertRedirect.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  route: PropTypes.string,
  handleClose: PropTypes.func,
};

export default AlertRedirect;
