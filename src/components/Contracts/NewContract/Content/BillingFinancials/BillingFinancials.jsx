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
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import styles from './BillingFinancials.module.scss';

const BillingFinancials = ({ sendBillings }) => {
  const cardValue = {
    id: 0,
    billingCycle: 'Una vez',
    billingAmount: '',
    description: '',
    firstBillingDate: `${new Date()}`,
    lastBillingDate: `${new Date()}`,
    isLocked: false,
  };
  const [billings, setBillings] = useState([]);
  const [lastId, setLastId] = useState(0);

  const changeCardValue = (name, id, isDate, isSelect) => (e) => {
    const billingsArray = [...billings];
    const billIndex = billings.findIndex((element) => {
      return element.id === id;
    });

    let bill = {};

    if (isDate) {
      bill = { ...billingsArray[billIndex], [name]: e };
    } else if (isSelect) {
      bill = { ...billingsArray[billIndex], [name]: e.value };
    } else if (name === true) {
      bill = { ...billingsArray[billIndex], isLocked: true };
    } else if (name === false) {
      bill = { ...billingsArray[billIndex], isLocked: false };
    } else {
      bill = { ...billingsArray[billIndex], [name]: e.target.value };
    }

    billingsArray[billIndex] = bill;
    setBillings(billingsArray);
  };

  const removeElement = (id) => () => {
    const billingsArray = [...billings];
    const billIndex = billings.findIndex((element) => {
      return element.id === id;
    });
    const removed = [billingsArray.splice(billIndex, 1)];
    setBillings(billingsArray);
  };

  const addBilling = () => {
    const newBill = { ...cardValue, id: lastId + 1 };
    setBillings([...billings, newBill]);
    setLastId(lastId + 1);
  };

  useEffect(() => {
    sendBillings(billings);
  });

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
    return billings.map((billing) => {
      return (
        <Card key={billing.id} className={styles.cardForm}>
          <CardContent>
            <div className={styles.gridContainer}>
              <div className={styles.columnFullLeft}>
                <Select
                  className={styles.Select}
                  inputId="react-select-single"
                  isDisabled={billing.isLocked}
                  TextFieldProps={{
                    label: 'Ciclo de facturación',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="Ciclo de facturación"
                  options={suggestions}
                  value={{
                    label: billing.billingCycle,
                    value: billing.billingCycle,
                  }}
                  onChange={changeCardValue(
                    'billingCycle',
                    billing.id,
                    false,
                    true,
                  )}
                  components={Option}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    disabled={billing.isLocked}
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Primera Fecha de Cobro"
                    value={billing.firstBillingDate}
                    onChange={changeCardValue(
                      'firstBillingDate',
                      billing.id,
                      true,
                    )}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  fullWidth
                  disabled={billing.isLocked}
                  className={styles.textField}
                  label="Descripción"
                  margin="normal"
                  variant="outlined"
                  value={billing.description}
                  onChange={changeCardValue('description', billing.id)}
                />
              </div>
              <div className={styles.columnFullRigth}>
                <div className={styles.column}>
                  <TextField
                    required
                    fullWidth
                    disabled={billing.isLocked}
                    className={styles.textField}
                    label="cuenta de cobro (pesos colombiano)"
                    margin="normal"
                    variant="outlined"
                    value={billing.billingAmount}
                    onChange={changeCardValue('billingAmount', billing.id)}
                  />
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    disabled={billing.isLocked}
                    id="date-picker-inline"
                    label="Última Fecha de Cobro"
                    value={billing.lastBillingDate}
                    onChange={changeCardValue(
                      'lastBillingDate',
                      billing.id,
                      true,
                    )}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <div className={styles.options}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={billing.isLocked}
                    className={styles.buttonRemove}
                    startIcon={<Icon className="fas fa-ban" />}
                    onClick={removeElement(billing.id)}
                  >
                    Remover
                  </Button>
                  {billing.isLocked ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.button}
                      startIcon={<Icon className="fas fa-pencil-alt" />}
                      onClick={changeCardValue(false, billing.id)}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.button}
                      startIcon={<AddIcon />}
                      onClick={changeCardValue(true, billing.id)}
                    >
                      Guardar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });
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

BillingFinancials.propTypes = {
  sendBillings: PropTypes.func,
};

export default BillingFinancials;
