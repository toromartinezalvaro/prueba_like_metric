import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ja';
import 'react-day-picker/lib/style.css';
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
          localeUtils={MomentLocaleUtils}
          locale={'ja'}
          format="M/D/YYYY"
          value={moment(Number(salesStartDate)).toDate()}
          onDayChange={date => {
            dayChangeHandler(date.getTime());
          }}
          {...rest}
        />
      </CardBody>
    </Card>
  );
};

export default salesStartDate;
