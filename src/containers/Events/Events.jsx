import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import moment from 'moment';
import styles from './Events.module.scss';
import Event from '../../components/Event/Event';
import ScheduleService from '../../services/schedule/ScheduleServices';
import EventServices from '../../services/event/EventServices';

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
      canDisplace: false,
      dateValue: [],
      uniqueDate: false,
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

        if (salesStartDate === null || salesStartDate === undefined) {
          salesStartDate = new Date().getTime();
        }
        if (endOfSalesDate === null || endOfSalesDate === undefined) {
          endOfSalesDate = new Date().getTime();
        }
        if (averageDeliveryDate === null || averageDeliveryDate === undefined) {
          averageDeliveryDate = new Date().getTime();
        }
        if (balancePointDate === null || balancePointDate === undefined) {
          balancePointDate = new Date().getTime();
        }
        if (
          constructionStartDate === null ||
          constructionStartDate === undefined
        ) {
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
            { value: 1, label: 'FECHA UNICA' },
            {
              value: Number(salesStartDate),
              label: `FECHA INICIO PROYECTO (${moment(
                Number(salesStartDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              value: Number(endOfSalesDate),
              label: `FECHA FIN PROYECTO (${moment(
                Number(endOfSalesDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              value: Number(balancePointDate),
              label: `FECHA PUNTO DE EQUILIBRIO (${moment(
                Number(balancePointDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              value: Number(constructionStartDate),
              label: `FECHA INICIO DE CONSTRUCCIÓN (${moment(
                Number(constructionStartDate),
              ).format('DD/MM/YYYY')})`,
            },
            {
              value: Number(averageDeliveryDate),
              label: `FECHA PROMEDIO DE ENTREGAS (${moment(
                Number(averageDeliveryDate),
              ).format('DD/MM/YYYY')})`,
            },
          ],
        });
        console.log('Pues era error', this.state.schedule);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendEvent = () => {
    this.services
      .postEvent(this.props.towerId, this.state.event)
      .catch((error) => {
        console.log(error);
      });
    this.setState({ eventModal: { isOpen: false } });
    console.log({ state: this.state.event });
  };

  onChangeText = (e) => {
    this.setState({
      event: { ...this.state.event, description: e.target.value },
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

  uniqueDateValue = (e) => {
    let time = moment(e);
    console.log(time.toDate().getTime());
    this.setState({
      event: {
        ...this.state.event,
        customDate: time.toDate().getTime(),
        scheduleId: null,
      },
    });
  };

  render() {
    return (
      <div className={styles.events}>
        <Fab
          onClick={this.handleEvent}
          variant="contained"
          color="primary"
          size="small"
          disabled={this.props.disabled}
          className={styles.fab}
        >
          <AddIcon />
          Agregar Evento
        </Fab>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          fullWidth={true}
          maxWidth="md"
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

export default Events;
