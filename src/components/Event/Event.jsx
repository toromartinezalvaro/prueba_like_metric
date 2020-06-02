import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import GeneralInfo from './generalInfo/GeneralInfo';
import ContractReference from './ContractReference/ContractReference';
import styles from './Event.module.scss';

const Event = ({
  sendEvent,
  handleCloseEvent,
  schedule,
  onChangeText,
  changeDate,
  tag,
  event,
  displacementForDate,
  canDisplace,
  dateValue,
  uniqueDate,
  handleChangeUniqueDate,
  uniqueDateValue,
}) => {
  return (
    <Fragment>
      <div className={styles.heading}>
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-book-reader`} />
        </div>
        <div className={styles.titleExpand}>Información General</div>
      </div>
      <GeneralInfo
        schedule={schedule}
        onChangeText={onChangeText}
        changeDate={changeDate}
        tag={tag}
        event={event}
        displacementForDate={displacementForDate}
        canDisplace={canDisplace}
        dateValue={dateValue}
        uniqueDate={uniqueDate}
        uniqueDateValue={uniqueDateValue}
        handleChangeUniqueDate={handleChangeUniqueDate}
      />
      
      <div className={styles.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={sendEvent}
          startIcon={<Icon className="far fa-calendar-alt" />}
        >
          Agregar Evento
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={`${styles.button} ${styles.buttonMargin}`}
          startIcon={<Icon className="fas fa-ban" />}
          onClick={handleCloseEvent}
        >
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  sendEvent: PropTypes.func,
  handleCloseEvent: PropTypes.func,
  schedule: PropTypes.object,
  onChangeText: PropTypes.object,
};

export default Event;
