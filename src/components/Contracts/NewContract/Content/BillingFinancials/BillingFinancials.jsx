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
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import styles from './BillingFinancials.module.scss';

const BillingFinancials = (services) => {
  const [count, setCount] = useState(1);
  const [firstBilling, setFirstBilling] = useState(new Date());
  const [lastBilling, setLastBilling] = useState(new Date());
  const [cardValue, setCardValue] = useState({
    billingCycle: '',
    firstBillingDate: '',
    description: '',
    billingAmount: '',
    lastBillingCycle: '',
  });

  const changeFirstBilling = date => {
    setFirstBilling(date);
    setCardValue({ ...cardValue, [firstBilling]: date });
  }

  const changeLastBilling = date => {
    setLastBilling(date);
    setCardValue({ ...cardValue, [lastBilling]: date });
  }

  const saveCardValue = (name) => (e) => {
    setCardValue({ ...cardValue, [name]: e.target.value });
  };

  const saveCardValueSelect = (name) => (label) => {
    setCardValue({ ...cardValue, [name]: label.value });
  };

  const addBilling = () => {
    setCount(count + 1);
  };

  const removeBilling = () => {
    setCount(count - 1);
  };

  const saveValues = () => {
    console.log("LA DATA ES:", cardValue)
  }

  const suggestions = [
    { label: 'Una vez' },
    { label: 'Mensual' },
    { label: 'Trimestral' },
    { label: 'Anual' },
  ].map((suggestion) => ({
    value: suggestion.label,
    label: suggestion.label,
  }));

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
        <Card key={i} className={styles.cardForm}>
          <CardContent>
            <div className={styles.gridContainer}>
              <div className={styles.columnFullLeft}>
                <Select className={styles.Select}
                  inputId="react-select-single"
                  TextFieldProps={{
                    label: 'Ciclo de facturación',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="Ciclo de facturación"
                  options={suggestions}
                  onChange={saveCardValueSelect('billingCycle')}
                  components={Option}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Primera Fecha de Cobro"
                    value={firstBilling}
                    onChange={changeFirstBilling}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Descripción"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className={styles.columnFullRigth}>
                <div className={styles.column}>
                  <TextField
                    required
                    fullWidth
                    className={styles.textField}
                    label="cuenta de cobro (pesos colombiano)"
                    margin="normal"
                    variant="outlined"
                    onChange={saveCardValue('description')}
                  />
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Última Fecha de Cobro"
                    value={lastBilling}
                    onChange={changeLastBilling}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <div className={styles.options}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    startIcon={<Icon className="fas fa-ban" />}
                    onClick={removeBilling}>
                    Remover
                    </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.button}
                    startIcon={<AddIcon />}
                    onClick={saveValues}
                  ></Button>
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
