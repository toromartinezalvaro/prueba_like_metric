import React, { useState, Fragment, useEffect } from 'react';
import PropTypes, { number } from 'prop-types';
import {
  Button,
  Icon,
  Fab,
  TextField,
  Card,
  MenuItem,
  CardContent,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Select, { components } from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import styles from './GeneralInfo.module.scss';

const GeneralInfo = ({
  schedule,
  onChangeText,
  changeDate,
  tag,
  event,
  displacementForDate,
  canDisplace,
  dateValue,
  uniqueDate,
  handleChangeUniqueDate,
  uniqueDateValue,
}) => {
  const Option = (props) => {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  const [initialDate, setInitialDate] = useState(new Date());
  const [isDisabled, setIsDisabled] = useState(false);

  const uniqueDateValueSend = (e = new Date()) => {
    uniqueDateValue(e);
  };

  const uniqueDateValueChange = (e) => {
    setInitialDate(e);
    uniqueDateValueSend(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rigthInformation}>
        <TextField
          fullWidth
          className={styles.item}
          label="Nombre de evento"
          variant="outlined"
          onChange={onChangeText}
        />
      </div>
      <div className={styles.leftInformation}>
        <div className={styles.itemSelect}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha De Evento"
              defaultValue={initialDate}
              value={initialDate}
              onChange={uniqueDateValueChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </div>
  );
};

GeneralInfo.propTypes = {
  handleCloseEvent: PropTypes.func,
  schedule: PropTypes.object,
  onChangeText: PropTypes.object,
  event: PropTypes.object,
};

export default GeneralInfo;
