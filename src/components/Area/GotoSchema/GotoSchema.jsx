import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import { DashboardRoutes } from '../../../routes/local/routes';

const GotoSchema = ({ open, towerId }) => {
  const history = useHistory();
  const gotoAdditional = () => {
    history.push(
      `${DashboardRoutes.base}${DashboardRoutes.building.value}${towerId}`,
    );
  };
  return (
    <MuiDialog open>
      <DialogTitle id="alert-dialog-title">ATENCIÓN</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Debes crear el esquema de la torre para definir las áreas
        </DialogContentText>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={gotoAdditional} color="primary" autoFocus>
                Ir a esquemas
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </MuiDialog>
  );
};

GotoSchema.propTypes = {
  open: PropTypes.bool,
  towerId: PropTypes.string,
};

export default GotoSchema;
