import React from 'react';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

export default function Dialog({ changeInputMethodHandler, disabled }) {
  return (
    <MuiDialog open>
      <DialogTitle id="alert-dialog-title">Metodo de entrada</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Seleccione un metodo de entrada por el cual quiere llenar el precio de
          las propiedades de esta torre
        </DialogContentText>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={disabled}
                onClick={() => {
                  changeInputMethodHandler('MANUAL');
                }}
              >
                Manualmente
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={disabled}
                onClick={() => {
                  changeInputMethodHandler('IMPORT');
                }}
              >
                Importando hoja de excel
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions></DialogActions>
    </MuiDialog>
  );
}
