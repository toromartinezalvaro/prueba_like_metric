import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-date-picker';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';

const salesStartDate = ({
  salesStartDate,
  endOfSalesDate,
  dayChangeHandler,
  endOfSalesDateHandler,
  ...rest
}) => {
  return (
    <Card>
      <CardHeader>
        <span>Inicio de fecha de ventas</span>
      </CardHeader>
      <CardBody>
        <div>
          <div>Fecha de inicio</div>
          <DayPickerInput
            clearIcon={null}
            format="dd/MM/yyyy"
            locale={'es'}
            value={moment(Number(salesStartDate)).toDate()}
            onChange={(date) => {
              dayChangeHandler(date.getTime());
            }}
            {...rest}
          />
        </div>
        <div>
          <div>Fecha de finalizacion</div>
          <DayPickerInput
            clearIcon={null}
            format="dd/MM/yyyy"
            locale={'es'}
            value={moment(Number(endOfSalesDate)).toDate()}
            onChange={(date) => {
              endOfSalesDateHandler(date.getTime());
            }}
            {...rest}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default salesStartDate;
