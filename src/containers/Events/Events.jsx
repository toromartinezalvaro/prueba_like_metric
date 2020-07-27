import {
  Dialog,
  DialogContent,
  DialogContentText,
  Icon,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import moment from 'moment';
import styles from './Events.module.scss';
import Event from '../../components/Event/Event';
import ScheduleService from '../../services/schedule/ScheduleServices';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import EventServices from '../../services/event/EventServices';
import Actions from '../../components/Event/actions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.ScheduleServices = new ScheduleService();
    this.services = new EventServices();
    this.state = {
      schedule: {},
      eventModal: {
        isOpen: false,
      },
      event: {
        displacement: 0,
        customDate: null,
        description: '',
        scheduleId: null,
      },
      tag: {
        name: '',
        date: new Date(),
      },
      description: null,
      canDisplace: false,
      dateValue: [],
      uniqueDate: false,
      alert: {
        opened: false,
        message: '',
      },
      openEdit: false,
      eventInformation: {},
    };
  }

  handleEvent = () => {
    this.setState({ eventModal: { isOpen: !this.state.eventModal.isOpen } });
  };

  componentDidMount() {
    this.ScheduleServices.getDates(this.props.towerId)
      .then((response) => {
        let {
          id,
          salesStartDate,
          endOfSalesDate,
          averageDeliveryDate,
          balancePointDate,
          constructionStartDate,
        } = response.data;
        if (!salesStartDate) {
          salesStartDate = new Date().getTime();
        }
        if (!endOfSalesDate) {
          endOfSalesDate = new Date().getTime();
        }
        if (!averageDeliveryDate) {
          averageDeliveryDate = new Date().getTime();
        }
        if (!balancePointDate) {
          balancePointDate = new Date().getTime();
        }
        if (!constructionStartDate) {
          constructionStartDate = new Date().getTime();
        }
        this.setState({
          schedule: {
            id,
            salesStartDate,
            endOfSalesDate,
            averageDeliveryDate,
            balancePointDate,
            constructionStartDate,
          },
          event: { scheduleId: id },
          dateValue: [
            {
              eventId: id,
              eventLabel: 'salesStartDate',
              value: Number(salesStartDate),
              label: `FECHA INICIO PROYECTO (${moment(
                Number(salesStartDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              eventId: id,
              eventLabel: 'endOfSalesDate',
              value: Number(endOfSalesDate),
              label: `FECHA FIN PROYECTO (${moment(
                Number(endOfSalesDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              eventId: id,
              eventLabel: 'balancePointDate',
              value: Number(balancePointDate),
              label: `FECHA PUNTO DE EQUILIBRIO (${moment(
                Number(balancePointDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              eventId: id,
              eventLabel: 'constructionStartDate',
              value: Number(constructionStartDate),
              label: `FECHA INICIO DE CONSTRUCCIÓN (${moment(
                Number(constructionStartDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              eventId: id,
              value: Number(averageDeliveryDate),
              eventLabel: 'averageDeliveryDate',
              label: `FECHA PROMEDIO DE ENTREGAS (${moment(
                Number(averageDeliveryDate),
              ).format('DD/MM/YYYY')})`,
            },
          ],
        });

        this.props.defaultDate(this.state.dateValue);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendEvent = () => {
    this.services
      .getAll(this.props.towerId)
      .then((events) => {
        if (
          events.data.find(
            (event) => event.description === this.state.description,
          )
        ) {
          this.props.spawnMessage(
            'Ya existe un evento con ese nombre',
            'error',
            'ERROR',
          );
        } else {
          this.services
            .postEvent(this.props.towerId, this.state.event)
            .then((response) => {
              const currentEvent = {
                eventId: response.data.id,
                value: response.data.customDate,
                label: response.data.description,
              };
              this.props.spawnMessage('EVENTO CREADO CON EXITO', 'success');
              this.props.currentEvent(currentEvent);
            })
            .catch((error) => {
              console.log(error);
            });
          this.setState({ eventModal: { isOpen: false } });
        }
      })
      .catch((error) => {
        this.toastAlert('ERROR: No se puede crear el evento');
        console.log(error);
      });
  };

  onChangeText = (e) => {
    const defaultDate = new Date();
    const time = this.state.event.customDate;
    const times =
      time === '' ? moment(defaultDate.getTime()).format('X') : time;
    this.setState({
      event: {
        description:
          time === 'Invalid date'
            ? `${e.target.value}`
            : `${e.target.value}(${moment(Number(time)).format('DD/MM/YYYY')})`,
        customDate: moment(Number(times)).format('x'),
        scheduleId: null,
      },
      description: `${e.target.value}`,
    });
  };

  uniqueDateValue = (e) => {
    const time = Number(moment(e.getTime()).format('x'));
    this.setState({
      event: {
        description: `${this.state.description}(${moment(Number(time)).format(
          'MM/DD/YYYY',
        )})`,
        customDate: time,
        scheduleId: null,
      },
    });
  };

  displacementForDate = (name) => (e) => {
    const updateDate = moment(this.state.event.date)
      .add(Number(e.target.value), 'M')
      .toDate();
    this.setState({
      event: {
        ...this.state.event,
        [name]: e.target.value,
        date: updateDate,
      },
    });
  };

  changeDate = (e) => {
    if (e.value !== 1) {
      this.setState({
        event: {
          ...this.state.event,
          scheduleId: this.state.schedule.id,
        },
      });
    }
  };

  handleChangeUniqueDate = (e) => {
    if (e.value === 1) {
      this.setState({ uniqueDate: true, canDisplace: false });
    } else {
      this.setState({
        event: {
          ...this.state.event,
          customDate: null,
          scheduleId: this.state.schedule.id,
        },
        uniqueDate: false,
        canDisplace: true,
      });
    }
  };

  openEditable = () => {
    const events = [...this.props.events];
    const eventInformation = events.find(
      (event) => event.eventId === this.props.eventSelected.id,
    );
    this.setState({
      openEdit: true,
      eventInformation,
    });
  };

  deleteEventAt = (id) => {
    this.services
      .deleteEvent(this.props.towerId, { id })
      .then((res) => {
        const events = [...this.props.events];
        const newEvents = events.filter(
          (event) => event.eventId !== this.props.eventSelected.id,
        );
        this.props.updateEvents(newEvents);
        this.handleCloseDialog();
        this.props.spawnMessage('EVENTO EDITADO CON EXITO', 'success');
      })
      .catch((error) => {
        console.log(error);
        this.props.spawnMessage(
          'A ocurrido un error. Comprueba tu conexión.',
          'error',
        );
      });
  };

  handleCloseDialog = () => {
    this.setState({ openEdit: false, eventInformation: {} });
  };

  render() {
    return (
      <div className={styles.events}>
        <Fab
          onClick={this.handleEvent}
          variant="contained"
          color="primary"
          size="small"
          disabled={this.props.eventIsUnique || this.props.isLocked}
          className={styles.fab}
        >
          <AddIcon />
          Agregar Evento
        </Fab>
        <Fab
          variant="contained"
          color="secondary"
          size="small"
          disabled={
            this.props.eventIsUnique ||
            this.props.isLocked ||
            this.props.eventSelected.label ||
            !this.props.eventSelected.id
          }
          className={styles.fab}
          onClick={this.openEditable}
        >
          Editar Evento
        </Fab>
        <Actions
          open={this.state.openEdit}
          eventInformation={this.state.eventInformation}
          deleteEventAt={this.deleteEventAt}
          close={this.handleCloseDialog}
        />
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          fullWidth={true}
          maxWidth="lg"
          open={this.state.eventModal.isOpen}
        >
          <DialogContent>
            <DialogContentText>
              <div className={styles.title}>
                <div
                  className={`${styles.circleIcon}  ${styles.circleColorTitle}`}
                >
                  <Icon className={`${styles.icon} far fa-calendar-alt`} />
                </div>
                <h2 className={styles.title}>Agregar Evento</h2>
              </div>
              <Event
                handleCloseEvent={this.handleEvent}
                schedule={this.state.schedule}
                onChangeText={this.onChangeText}
                changeDate={this.changeDate}
                tag={this.state.tag}
                event={this.state.event}
                displacementForDate={this.displacementForDate}
                canDisplace={this.state.canDisplace}
                dateValue={this.state.dateValue}
                uniqueDate={this.state.uniqueDate}
                handleChangeUniqueDate={this.handleChangeUniqueDate}
                sendEvent={this.sendEvent}
                uniqueDateValue={this.uniqueDateValue}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withDefaultLayout(Events);
