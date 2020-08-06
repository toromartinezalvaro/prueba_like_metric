import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

function Actions({ open, eventInformation, deleteEventAt, close, sendUpdate }) {
  const REGEX = /\(([^)]*)\)/g;
  const [event, setEvent] = useState({
    id: null,
    customDate: null,
    description: null,
    scheduleId: null,
  });

  useEffect(() => {
    setEvent({
      id: eventInformation.eventId,
      customDate: Number(eventInformation.value),
      description:
        eventInformation.label && eventInformation.label.replace(REGEX, ''),
      scheduleId: null,
    });
  }, [eventInformation]);

  const deleteThisEvent = () => {
    deleteEventAt(eventInformation.eventId);
  };

  const onChangeText = (e) => {
    let tempEvent = { ...event };
    tempEvent = { ...tempEvent, description: e.target.value };
    setEvent(tempEvent);
  };

  const onChangePicker = (date) => {
    let tempEvent = { ...event };
    tempEvent = { ...tempEvent, customDate: moment(date).valueOf() };
    setEvent(tempEvent);
  };

  const updateEvent = () => {
    const prevSend = {
      ...event,
      description: `${event.description}(${moment(event.customDate).format(
        'DD/MM/YYYY',
      )})`,
    };
    sendUpdate(prevSend);
    close();
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
                onChange={onChangeText}
                defaultValue={
                  eventInformation.label &&
                  eventInformation.label.replace(REGEX, '')
                }
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
                  value={event.customDate}
                  onChange={onChangePicker}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={updateEvent}>
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
  sendUpdate: PropTypes.func,
};

export default Actions;
