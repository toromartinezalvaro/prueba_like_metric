import React from 'react';
import PropTypes from 'prop-types';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiDialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function Actions({ open, eventInformation, deleteEventAt, close }) {
  const deleteThisEvent = () => {
    deleteEventAt(eventInformation.eventId);
  };
  return (
    <MuiDialog open={open}>
      <DialogTitle id="alert-dialog-title">Edición de eventos</DialogTitle>
      <DialogContent>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del evento"
                fullWidth
                defaultValue={eventInformation.label}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <DatePicker
                  fullWidth
                  autoOk
                  error={false}
                  helperText=""
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Fecha Evento"
                  value={Number(eventInformation.value)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary">
          Editar
        </Button>
        <Button variant="contained" color="secondary" onClick={deleteThisEvent}>
          Borrar
        </Button>
        <Button variant="contained" color="inherit" onClick={close}>
          Cerrar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

Actions.propTypes = {
  open: PropTypes.bool,
  eventInformation: PropTypes.object,
  deleteEventAt: PropTypes.func,
  close: PropTypes.func,
};

export default Actions;
