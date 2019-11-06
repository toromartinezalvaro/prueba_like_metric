/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from './BillingFinancials.module.scss';

const BillingFinancials = (services) => {
  const [value, setValue] = useState([]);
  const [count, setCount] = useState(1);

  const addBilling = () => {
    setCount(count + 1);
  };

  const removeBilling = () => {
    setCount(count - 1);
  };

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

  const displayComponent = () => {
    const components = [];
    for (let i = 0; i < count; i++) {
      components.push(
        <Card key={i}>
          <CardContent>
            <div className={styles.row}>
              <div className={styles.column}>
                {/* <Select
                      className={styles.Select}
                      inputId="react-select-single"
                      TextFieldProps={{
                        label: 'País',
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                      }}
                      placeholder="Seleccione un país"
                      options={suggestions}
                      components={Option}
                      onChange={onChangeSelect('patnerCountry')}
                    /> */}
                <KeyboardDatePicker
                  disableToolbar
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  variant="outlined"
                  placeholder="Primera fecha de cobro"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <TextField
                  required
                  fullWidth
                  className={styles.textField}
                  label="Descripción"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className={styles.column}>
                {/* <Select
                      className={styles.Select}
                      inputId="react-select-single"
                      TextFieldProps={{
                        label: 'País',
                        InputLabelProps: {
                          htmlFor: 'react-select-single',
                          shrink: true,
                        },
                      }}
                      placeholder="Seleccione un país"
                      options={suggestions}
                      components={Option}
                      onChange={onChangeSelect('patnerCountry')}
                    /> */}
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <div className={styles.column}>
                  <TextField
                    required
                    fullWidth
                    className={styles.textField}
                    label="cuenta de cobro (pesos colombiano)"
                    margin="normal"
                    variant="outlined"
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    variant="outlined"
                    placeholder="Primera fecha de cobro"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <div className={styles.options}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.button}
                      startIcon={<AddIcon />}
                      onClick={removeBilling}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>,
      );
    }
    return components || null;
  };
  return (
    <Fragment>
      {displayComponent()}
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        startIcon={<AddIcon />}
        onClick={addBilling}
      >
        Agregar Transacción de Facturas
      </Button>
    </Fragment>
  );
};

export default BillingFinancials;
