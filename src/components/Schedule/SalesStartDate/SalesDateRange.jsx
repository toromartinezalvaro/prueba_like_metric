import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DayPickerInput from 'react-date-picker';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Styles from './SalesDateRange.module.scss';
import Input from '../../UI/Input/Input';

const displacementValidation = () => [
  {
    fn: (value) => value >= 0,
    message: 'Debe ser mayor 0',
  },
];

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);

function SalesDateRange({
  endOfSalesDate,
  salesStartDate,
  averageDeliveryDate,
  balancePointDate,
  constructionStartDate,
  salesStartDateHandler,
  endOfSalesDateHandler,
  constructionStartDateHandler,
  averageDeliveryDateHandler,
  balancePointDateHandler,
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
              value={moment(Number(balancePointDate)).toDate()}
              onChange={(date) => {
                balancePointDateHandler(date.getTime());
              }}
            />
          </div>
          <div className={Styles.container}>
            <div className={Styles.label}>Inicio de Construcción:</div>
            <DayPickerInput
              clearIcon={null}
              format="dd/MM/yyyy"
              locale={'es'}
              value={moment(Number(constructionStartDate)).toDate()}
              onChange={(date) => {
                salesStartDateHandler(date.getTime());
              }}
              disabled
              disableCalendar
            />
            <Input
              validations={displacementValidation()}
              value={moment(Number(constructionStartDate)).diff(
                moment(Number(balancePointDate)),
                'month',
              )}
              style={{ width: '75px' }}
              onChange={(target) => {
                constructionStartDateHandler(target.value);
              }}
            />
            <div className={Styles.label}>
              Desplazamiento
              <Tooltip
                /* style={{
                  tooltip: {
                    fontSize: '100px',
                  },
                }} */
                // classes={{
                //   fontSize: '100px',
                // }}
                title="Desplazamiento en meses respecto a la fecha de punto de equilibrio"
              >
                <span className={Styles.Badge}>?</span>
              </Tooltip>
            </div>
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
              value={moment(Number(averageDeliveryDate)).toDate()}
              disabled
              disableCalendar
            />
            <Input
              validations={displacementValidation()}
              value={moment(Number(averageDeliveryDate)).diff(
                moment(Number(balancePointDate)),
                'month',
              )}
              style={{ width: '75px' }}
              onChange={(target) => {
                averageDeliveryDateHandler(target.value);
              }}
            />
            <div className={Styles.label}>
              Desplazamiento
              <LightTooltip title="Desplazamiento en meses respecto a la fecha de punto de equilibrio">
                <span className={Styles.Badge}>?</span>
              </LightTooltip>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

SalesDateRange.propTypes = {
  salesStartDate: PropTypes.number,
  endOfSalesDate: PropTypes.number,
  averageDeliveryDate: PropTypes.number,
  balancePointDate: PropTypes.number,
  constructionStartDate: PropTypes.number,
  salesStartDateHandler: PropTypes.func,
  endOfSalesDateHandler: PropTypes.func,
  constructionStartDateHandler: PropTypes.func,
  averageDeliveryDateHandler: PropTypes.func,
  balancePointDateHandler: PropTypes.func,
};

SalesDateRange.defaultProps = {
  salesStartDate: new Date().getTime(),
  endOfSalesDate: new Date().getTime(),
  averageDeliveryDate: new Date().getTime(),
  balancePointDate: new Date().getTime(),
  constructionStartDate: new Date().getTime(),
  salesStartDateHandler: () => null,
  endOfSalesDateHandler: () => null,
  constructionStartDateHandler: () => null,
  averageDeliveryDateHandler: () => null,
  balancePointDateHandler: () => null,
};

export default SalesDateRange;
