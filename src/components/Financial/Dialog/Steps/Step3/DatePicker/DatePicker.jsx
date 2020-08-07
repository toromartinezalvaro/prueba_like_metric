import React from 'react';
import { getUnixTime, fromUnixTime } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useField, useFormikContext } from 'formik';

const DatePicker = (props) => {
  const { onChange, name, realValue } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <MuiDatePicker
        name={name}
        inputVariant="outlined"
        variant="inline"
        views={['year', 'month']}
        minDate={new Date()}
        format="MMM-yy"
        margin="normal"
        value={fromUnixTime(realValue)}
        onChange={(val) => {
          setFieldValue(field.name, val);
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
  realValue: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default DatePicker;
