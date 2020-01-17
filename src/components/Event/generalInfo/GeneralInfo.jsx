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

  const uniqueDateValueChange = (e) => {
    setInitialDate(e);
  };

  const uniqueDateValueSend = () => {
    uniqueDateValue(initialDate);
    setIsDisabled(!isDisabled);
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
          <Select
            required
            inputId="react-select-single"
            TextFieldProps={{
              label: 'fecha',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Seleccione una Fecha"
            options={dateValue}
            onChange={handleChangeUniqueDate}
            components={Option}
          />
        </div>
        <div className={styles.subColumn}>
          {uniqueDate && (
            <Card className={styles.cardForm}>
              <CardContent>
                <div className={styles.gridSubContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled={isDisabled}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha de Cobro"
                      value={initialDate}
                      onChange={uniqueDateValueChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <div className={styles.buttonSubColumn}>
                    <Fab
                      color="primary"
                      size="small"
                      aria-label="add"
                      className={styles.fab}
                      onClick={uniqueDateValueSend}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
