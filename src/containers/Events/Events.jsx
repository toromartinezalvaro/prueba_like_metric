import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import styles from './Events.module.scss';
import Event from '../../components/Event/Event';
import ScheduleService from '../../services/schedule/ScheduleServices';

class Events extends Component {
  constructor(props) {
    super(props);
    this.services = new ScheduleService();
    this.state = {
      eventModal: {
        isOpen: false,
      },
      schedule: {},
    };
  }

  handleEvent = () => {
    this.setState({ eventModal: { isOpen: !this.state.eventModal.isOpen } });
  };

  componentDidMount() {
    this.services
      .getDates(this.props.towerId)
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
        });
        console.log('Pues era error', this.state.schedule);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Events;
