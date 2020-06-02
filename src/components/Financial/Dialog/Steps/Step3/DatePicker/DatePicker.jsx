import React from 'react';
import { getUnixTime, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ field }) => {
  const { value, onChange, name, ...fieldRest } = field;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <MuiDatePicker
        {...fieldRest}
        name={name}
        inputVariant="outlined"
        variant="inline"
        views={['year', 'month']}
        minDate={new Date()}
        format="MMM-yy"
        margin="normal"
        value={fromUnixTime(value)}
        onChange={(val) => {
          onChange({
            target: {
              name,
              value: getUnixTime(val),
            },
          });
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  field: PropTypes.any,
};

export default DatePicker;
