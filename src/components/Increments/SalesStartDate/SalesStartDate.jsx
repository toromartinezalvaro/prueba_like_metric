import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-date-picker';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';

const salesStartDate = ({ salesStartDate, dayChangeHandler, ...rest }) => {
  return (
    <Card>
      <CardHeader>
        <span>Inicio de fecha de ventas</span>
      </CardHeader>
      <CardBody>
        <DayPickerInput
          clearIcon={null}
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
