import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DashboardRoutes } from '../../../../routes/local/routes';

const PreventDelete = ({ open, onClose, towerId }) => {
  const history = useHistory();

  const handleClose = () => {
    onClose();
  };
  const gotoAdditional = () => {
    history.push(
      `${DashboardRoutes.base}${DashboardRoutes.areasAdditional.value}${towerId}`,
    );
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ATENCIÓN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Debes crear áreas adicionales antes de aparear`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={gotoAdditional} color="primary" autoFocus>
            Ir a áreas adicionales
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
  towerId: PropTypes.string.isRequired,
};

export default PreventDelete;
