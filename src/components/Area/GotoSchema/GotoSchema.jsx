import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DashboardRoutes } from '../../../routes/local/routes';

const GotoSchema = ({ open, towerId }) => {
  const history = useHistory();
  const gotoAdditional = () => {
    history.push(
      `${DashboardRoutes.base}${DashboardRoutes.building.value}${towerId}`,
    );
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>ATENCIÓN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Debes crear el esquema de la torre para definir las áreas`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={gotoAdditional} color="primary" autoFocus>
            Ir a esquemas
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default GotoSchema;
