import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-date-picker';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Styles from './SalesDateRange.module.scss';
import Input from '../../UI/Input/Input';

function SalesDateRange({
  salesStartDate,
  endOfSalesDate,
  salesStartDateHandler,
  endOfSalesDateHandler,
}) {
  return (
    <Card>
      <CardHeader>
        <span>Fechas de ventas</span>
      </CardHeader>
      <CardBody>
        <div className={Styles.wrapper}>
          <div className={Styles.container}>
            <div className={Styles.label}>Fecha de Corte:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment().toDate()}
              disabled
              disableCalendar
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Inicio de Pre-Ventas:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(salesStartDate)).toDate()}
              onChange={(date) => {
                salesStartDateHandler(date.getTime());
              }}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Punto de equilibrio:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(salesStartDate)).toDate()}
              onChange={(date) => {
                salesStartDateHandler(date.getTime());
              }}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Inicio de Construcción:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(salesStartDate)).toDate()}
              onChange={(date) => {
                salesStartDateHandler(date.getTime());
              }}
            />
            <Input />
            <div className={Styles.label}>Desplazamiento</div>
          </div>

          <div className={Styles.container}>
            <div className={Styles.label}>Fin de la Construcción:</div>
            <DayPickerInput
              minDate={moment(Number(salesStartDate)).toDate()}
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(endOfSalesDate)).toDate()}
              onChange={(date) => {
                endOfSalesDateHandler(date.getTime());
              }}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Promedio de entrega:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(salesStartDate)).toDate()}
              onChange={(date) => {
                salesStartDateHandler(date.getTime());
              }}
            />
            <div className={Styles.label}>Desplazamiento</div>

            <Input />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

SalesDateRange.propTypes = {
  salesStartDate: PropTypes.number,
  endOfSalesDate: PropTypes.number,
  salesStartDateHandler: PropTypes.func,
  endOfSalesDateHandler: PropTypes.func,
};

SalesDateRange.defaultProps = {
  salesStartDate: new Date().getTime(),
  endOfSalesDate: new Date().getTime(),
  salesStartDateHandler: () => null,
  endOfSalesDateHandler: () => null,
};

export default SalesDateRange;
