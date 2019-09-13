import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-date-picker';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Styles from './StageDates.module.scss';

function StageDates({ stage, ...rest }) {
  return (
    <Card>
      <CardHeader>
        <span>Etapa {stage}</span>
      </CardHeader>
      <CardBody>
        <div className={Styles.wrapper}>
          <div className={Styles.container}>
            <div className={Styles.label}>Inicio de etapa:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Fecha de preventas:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Punto de equilibrio:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Inicio de construccion:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Fin de la construccion:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Fecha promedio entragas:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Final etapa:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Fecha plano curaduria:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Fecha ultima venta:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

StageDates.propTypes = {
  stage: PropTypes.number,
};

StageDates.defaultProps = {
  stage: 1,
};

export default StageDates;
