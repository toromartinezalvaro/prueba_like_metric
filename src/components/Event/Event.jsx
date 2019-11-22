import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import GeneralInfo from './generalInfo/GeneralInfo';
import ContractReference from './ContractReference/ContractReference';
import styles from './Event.module.scss';

const Event = ({ handleCloseEvent, schedule }) => {
  return (
    <Fragment>
      <div className={styles.heading}>
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-book-reader`} />
        </div>
        <div className={styles.titleExpand}>Información General</div>
      </div>
      <GeneralInfo schedule={schedule}/>
      <div className={styles.heading}>
        <div
          className={`${styles.circleIcon}  ${styles.circleColorGeneralBlue}`}
        >
          <Icon className={`${styles.iconGeneral} fas fa-file-signature`} />
        </div>
        <div className={styles.titleExpand}>Información de Contrato Ligado</div>
      </div>
      <ContractReference/>

      <div className={styles.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
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
  handleCloseEvent: PropTypes.func,
  schedule: PropTypes.object,
};

export default Event;
