/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';
import {
  Button,
  Card,
  TextField,
  Icon,
  CardContent,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Numbers from '../../../../../helpers/numbers';
import MonthEnum from './month.enum';
import YearEnum from './year.enum';
import Events from '../../../../../containers/Events/Events';

import styles from './BillingFinancials.module.scss';
import SuggestionEnum from './suggestion.enum';

const BillingFinancials = ({
  sendBillings,
  towerId,
  events,
  currentEvent,
  dataIfEdit,
}) => {
  const [todayDate, setTodayDate] = useState(new Date().getTime());
  const [uniqueEvent, setUniqueEvent] = useState(new Date().getTime());
  const cardValue = {
    id: 0,
    eventId: null,
    cycle: 'Pago Único',
    amount: 0,
    description: '',
    displacement: 0,
    lastBillingDate: todayDate,
    initalBillingDate: todayDate,
    iva: 0,
    paymentNumber: 1,
    isLocked: false,
    type: 'unique',
  };
  const [billings, setBillings] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [month, setMonth] = useState(MonthEnum);
  const [eventIsUnique, setEventIsUnique] = useState(false);
  const [disabledLastBilling, setDisableLastBilling] = useState(true);

  let totalBills = 0;

  useEffect(() => {
    if (dataIfEdit) {
      setBillings(dataIfEdit.billings);
    }
  });

  const changeCardValue = (
    name,
    id,
    elementIsADate,
    elementIsASelect,
    elementIsAnEvent,
  ) => (element) => {
    const billingsArray = [...billings];
    const billIndex = billings.findIndex((element) => {
      return element.id === id;
    });

    let bill = {};

    if (elementIsADate) {
      bill = {
        ...billingsArray[billIndex],
        [name]: Number(moment(element).format('x')),
      };
    } else if (elementIsASelect) {
      if (name === 'cycle') {
        bill = {
          ...billingsArray[billIndex],
          [name]: element.label,
          type: element.type,
        };
      } else if (name === 'eventId' && element.eventId === 0) {
        setEventIsUnique(true);
        bill = {
          ...billingsArray[billIndex],
          initalBillingDate: uniqueEvent.value,
          eventId: element.eventId,
        };
        billingsArray[billIndex].eventId = element.eventId;
      } else if (name === 'eventId' && element.eventId !== 0) {
        setEventIsUnique(false);
        bill = {
          ...billingsArray[billIndex],
          initalBillingDate: Number(element.value),
          lastBillingDate: Number(element.value),
          eventId: element.eventId,
        };
        billingsArray[billIndex].eventId = element.eventId;
      }
    } else if (elementIsAnEvent) {
      bill = { ...billingsArray[billIndex], [name]: element.value };
    } else if (name === true) {
      bill = { ...billingsArray[billIndex], isLocked: true };
    } else if (name === false) {
      bill = { ...billingsArray[billIndex], isLocked: false };
    } else {
      if (name === 'displacement') {
        const newDate = moment(billingsArray[billIndex].initalBillingDate)
          .add(Number(element.target.value), billingsArray[billIndex].type)
          .format('x');
        bill = {
          ...billingsArray[billIndex],
        };
        billingsArray[billIndex].initalBillingDate = Number(newDate);
      } else if (name === 'paymentNumber') {
        if (billingsArray[billIndex].type !== 'quarter') {
          const newDate = moment(billingsArray[billIndex].initalBillingDate)
            .add(Number(element.target.value), billingsArray[billIndex].type)
            .format('x');
          bill = {
            ...billingsArray[billIndex],
          };
          billingsArray[billIndex].lastBillingDate = Number(newDate);
        }
        const newDate = moment(billingsArray[billIndex].initalBillingDate)
          .add(Number(element.target.value), billingsArray[billIndex].type)
          .format('x');
        bill = {
          ...billingsArray[billIndex],
        };
        billingsArray[billIndex].lastBillingDate = Number(newDate);
      }
      bill = { ...billingsArray[billIndex], [name]: element.target.value };
    }
    billingsArray[billIndex] = bill;
    setBillings(billingsArray);
    sendBillings(billingsArray);
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

  const createdEvent = (eventObject) => {
    currentEvent(eventObject);
    setUniqueEvent(eventObject);
  };

  const defaultDate = (defaultDates) => {
    defaultDates.map((date) => {
      if (
        !events.find((event) => {
          return event.label === date.label;
        })
      ) {
        events.push(date);
      }
    });
  };

  const suggestions = SuggestionEnum.map((suggestion) => ({
    value: suggestion.value,
    label: suggestion.label,
    type: suggestion.type,
  }));

  const Option = (props) => {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
          zIndex: '999999999',
          overflowY: 'scroll',
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  const displayComponent = () => {
    return billings.map((billing, i) => {
      totalBills +=
        (Number(billing.amount) +
          Number(billing.amount) * (billing.iva / 100)) *
        Number(billing.paymentNumber);
      return (
        <Card key={billing.id} className={styles.cardForm}>
          <CardContent>
            <div className={styles.gridContainer}>
              <div className={styles.columnFullLeft}>
                <h3>Forma de pago N°{i}</h3>
                <h4>Proyección de pago</h4>
                <Select
                  className={styles.Select}
                  inputId="react-select-single"
                  isDisabled={billing.isLocked}
                  TextFieldProps={{
                    label: 'ciclo de cobro',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="ciclo de cobro"
                  components={Option}
                  options={suggestions}
                  defaultValue={{
                    label: billing.cycle,
                    value: billing.cycle,
                  }}
                  onChange={changeCardValue('cycle', billing.id, false, true)}
                />
                <h4>Fecha inicial</h4>
                <Select
                  className={styles.Select}
                  inputId="react-select-single"
                  isDisabled={billing.isLocked}
                  TextFieldProps={{
                    label: 'Fecha inicial',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="Fecha inicial"
                  components={Option}
                  options={events}
                  onChange={changeCardValue('eventId', billing.id, false, true)}
                />
                <Events
                  towerId={towerId}
                  defaultDate={defaultDate}
                  currentEvent={createdEvent}
                  eventIsUnique={eventIsUnique}
                />
                <TextField
                  required
                  disabled={eventIsUnique}
                  className={styles.textField}
                  label={`Desplazamiento ${billing.cycle}`}
                  margin="normal"
                  variant="outlined"
                  defaultValue={billing.displacement}
                  value={billing.displacement}
                  onChange={changeCardValue('displacement', billing.id)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disabled={!eventIsUnique}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Fecha Inicial"
                    value={billing.initalBillingDate}
                    onChange={changeCardValue(
                      'initalBillingDate',
                      billing.id,
                      true,
                    )}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  required
                  disabled={billing.cycle === 'Pago Único'}
                  className={styles.textField}
                  label="Numero de pagos"
                  margin="normal"
                  variant="outlined"
                  defaultValue={billing.paymentNumber}
                  value={billing.paymentNumber}
                  onChange={changeCardValue('paymentNumber', billing.id)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disabled={true}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Fecha Final"
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
              </div>
              <div className={styles.columnFullRigth}>
                <div className={styles.column}>
                  <TextField
                    required
                    disabled={billing.isLocked}
                    className={styles.textField}
                    label="Valor antes de IVA"
                    margin="normal"
                    variant="outlined"
                    defaultValue={dataIfEdit && billing.amount}
                    value={billing.billingAmount}
                    onChange={changeCardValue('amount', billing.id)}
                  />
                  <TextField
                    required
                    disabled={billing.isLocked}
                    className={styles.textField}
                    label="Valor IVA %"
                    margin="normal"
                    variant="outlined"
                    defaultValue={billing.iva}
                    value={billing.billingAmount}
                    onChange={changeCardValue('iva', billing.id)}
                  />
                  <h3>Valor en pesos del IVA</h3>
                  <NumberFormat
                    value={Numbers.toFixed(
                      billing.amount * (billing.iva / 100),
                    )}
                    displayType={'text'}
                    className={styles.TotalAmountIva}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </div>

                <div className={styles.cardForm}>
                  <div className={styles.column}>
                    <div className={styles.leftPick}>
                      <TextField
                        disabled={billing.isLocked}
                        multiline
                        rows={6}
                        className={styles.multiline}
                        label="Descripción"
                        margin="normal"
                        variant="outlined"
                        defaultValue={billing.description}
                        onChange={changeCardValue('description', billing.id)}
                      />
                    </div>
                  </div>
                </div>

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
                  <div className={styles.TotalSubbills}>
                    <h4 sclassName={styles.textTotal}>
                      {' '}
                      Valor de cuenta con IVA:
                    </h4>
                    <NumberFormat
                      className={styles.amount}
                      value={Numbers.toFixed(
                        (Number(billing.amount) +
                          Number(billing.amount) *
                            (Number(billing.iva) / 100)) *
                          Number(billing.paymentNumber),
                      )}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </div>
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
      <div className={styles.cardForm}>
        <div className={styles.Totalbills}>
          <h4 sclassName={styles.textTotal}> Valor Total:</h4>
          <NumberFormat
            value={Numbers.toFixed(totalBills)}
            displayType={'text'}
            className={styles.TotalAmount}
            thousandSeparator={true}
            prefix={'$'}
          />
        </div>
      </div>
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
