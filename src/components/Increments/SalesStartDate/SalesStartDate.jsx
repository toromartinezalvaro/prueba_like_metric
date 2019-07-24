import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-date-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './SalesStartDate.module.scss';

const salesStartDate = ({ salesStartDate, dayChangeHandler, ...rest }) => {
  return (
    <Card>
      <CardHeader>
        <span>Inicio de fecha de ventas</span>
      </CardHeader>
      <CardBody>
        <DayPickerInput
        format="dd/MM/yyyy"
          locale={'es'}         
          value={moment(Number(salesStartDate)).toDate()}
          onChange={date => {
            dayChangeHandler(date.getTime());
          }}
          {...rest}
        />
      </CardBody>
    </Card>
  );
};

export default salesStartDate;
