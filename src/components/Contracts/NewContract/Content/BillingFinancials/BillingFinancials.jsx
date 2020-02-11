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
  InputAdornment,
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
  watchingContract,
}) => {
  const [todayDate, setTodayDate] = useState(new Date().getTime());
  const [uniqueEvent, setUniqueEvent] = useState(new Date().getTime());
  const [lastDate, setLastDate] = useState('');
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
      const data = dataIfEdit.billings;
      setBillings(data);
      setLastId(1);
      setTimeout(() => {
        watchingContract();
      }, 1000);
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
          initalBillingDate: Number(uniqueEvent.value),
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
        setLastDate(Number(element.value));
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
        billingsArray[billIndex].initalBillingDate = Number(lastDate);
        const newDate = moment(billingsArray[billIndex].initalBillingDate)
          .add(
            Number(element.target.value),
            billingsArray[billIndex].type === 'unique'
              ? 'months'
              : billingsArray[billIndex].type,
          )
          .format('x');
        bill = {
          ...billingsArray[billIndex],
        };
        billingsArray[billIndex].initalBillingDate = Number(newDate);
        billingsArray[billIndex].lastBillingDate = Number(newDate);
        if (
          billingsArray[billIndex].type !== 'quarter' ||
          billingsArray[billIndex].type !== 'unique'
        ) {
          billingsArray[billIndex].lastBillingDate = newDate;
          const date = moment(newDate)
            .add(
              Number(
                billingsArray[billIndex].paymentNumber !== 1
                  ? Number(billingsArray[billIndex].paymentNumber) - 1
                  : 0,
              ),
              billingsArray[billIndex].type,
            )
            .format('x');
          bill = {
            ...billingsArray[billIndex],
          };
          billingsArray[billIndex].lastBillingDate = Number(date);
        }
        billingsArray[billIndex].lastBillingDate = Number(newDate);
      } else if (name === 'paymentNumber') {
        billingsArray[billIndex].lastBillingDate = Number(lastDate);
        if (billingsArray[billIndex].type !== 'quarter') {
          billingsArray[billIndex].lastBillingDate = Number(lastDate);
          const newDate = moment(billingsArray[billIndex].initalBillingDate)
            .add(
              Number(
                Number(element.target.value) !== 1
                  ? Number(element.target.value) - 1
                  : 0,
              ),
              billingsArray[billIndex].type,
            )
            .format('x');
          bill = {
            ...billingsArray[billIndex],
          };
          billingsArray[billIndex].lastBillingDate = Number(newDate);
        }
        const newDate = moment(billingsArray[billIndex].initalBillingDate)
          .add(
            Number(
              Number(element.target.value) !== 1
                ? Number(element.target.value) - 1
                : 0,
            ),
            billingsArray[billIndex].type,
          )
          .format('x');
        bill = {
          ...billingsArray[billIndex],
        };
        billingsArray[billIndex].lastBillingDate = Number(newDate);
      }
      const value = element.target.value.replace(',', '');
      bill = {
        ...billingsArray[billIndex],
        [name]: value,
      };
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
      function NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;
        return (
          <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
              onChange({
                target: {
                  value: values.value,
                },
              });
            }}
            thousandSeparator
          />
        );
      }
      totalBills +=
        (Number(billing.amount) +
          Number(billing.amount) * (billing.iva / 100)) *
        Number(billing.paymentNumber);

      return (
        <Card key={billing.id} className={styles.cardForm}>
          <CardContent>
            <div className={styles.gridContainer}>
              <h3 className={styles.tittlePayment}>Forma de pago N°{i}</h3>
              <div className={styles.paymentProjection}>
                <h4 className={styles.tittleForProjection}>
                  Proyección de pago:
                </h4>
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') document.getElementById('2').focus();
                  }}
                />
              </div>
              <div className={styles.amountSection}>
                <TextField
                  required
                  disabled={billing.isLocked}
                  className={styles.textField}
                  label={`Valor antes de IVA ${billing.cycle}`}
                  margin="normal"
                  variant="outlined"
                  defaultValue={billing.amount}
                  value={billing.amount}
                  onBlur={changeCardValue('amount', billing.id)}
                  id={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') document.getElementById('3').focus();
                  }}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  disabled={billing.isLocked}
                  className={styles.textFieldIva}
                  label="Valor IVA %"
                  margin="normal"
                  variant="outlined"
                  defaultValue={billing.iva}
                  id="3"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      document.getElementById('sel4').focus();
                  }}
                  value={billing.iva}
                  onChange={changeCardValue('iva', billing.id)}
                />
                <div className={styles.amountIva}>
                  <h4 className={styles.ivaTitle}>Valor en pesos del IVA</h4>
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
                <div className={styles.amountIvaTotal}>
                  <h4 sclassName={styles.ivaTitle}>Valor de cuenta con IVA:</h4>
                  <NumberFormat
                    className={styles.amount}
                    value={Numbers.toFixed(
                      (Number(billing.amount) +
                        Number(billing.amount) * (Number(billing.iva) / 100)) *
                        Number(billing.paymentNumber),
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </div>
              </div>
              <h4>Fecha inicial</h4>
              <div className={styles.datesSection}>
                <div className={styles.event}>
                  <Select
                    className={styles.SelectDate}
                    inputId="sel4"
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
                    value={events.find((option) => {
                      return (
                        option.eventId === billing.eventId &&
                        billing.eventId && {
                          eventId: option.eventId,
                          value: option.value,
                          label: option.label,
                        }
                      );
                    })}
                    options={events}
                    onChange={changeCardValue(
                      'eventId',
                      billing.id,
                      false,
                      true,
                    )}
                  />
                  <Events
                    towerId={towerId}
                    isLocked={billing.isLocked}
                    defaultDate={defaultDate}
                    currentEvent={createdEvent}
                    eventIsUnique={eventIsUnique}
                  />
                </div>
                <div className={styles.dateInitial}>
                  <TextField
                    required
                    disabled={eventIsUnique}
                    className={styles.textFieldDisplace}
                    label={`Desplazamiento ${billing.cycle}`}
                    margin="normal"
                    variant="outlined"
                    defaultValue={billing.displacement}
                    value={billing.displacement}
                    onChange={changeCardValue('displacement', billing.id)}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      className={styles.picker}
                      disabled={!eventIsUnique}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha Inicial"
                      value={Number(billing.initalBillingDate)}
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
                </div>
                <div className={styles.lastDate}>
                  <TextField
                    required
                    disabled={billing.cycle === 'Pago Único'}
                    className={styles.textFieldDisplace}
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
                      autoOk
                      className={styles.picker}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha Final"
                      value={Number(billing.lastBillingDate)}
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
              </div>
              <div className={styles.cardFormMulti}>
                <div className={styles.column}>
                  <div className={styles.leftPick}>
                    <TextField
                      disabled={billing.isLocked}
                      multiline
                      rows={5}
                      className={styles.multiline}
                      label="Descripción"
                      margin="normal"
                      variant="outlined"
                      defaultValue={billing.description}
                      onChange={changeCardValue('description', billing.id)}
                    />
                  </div>
                  <div className={styles.actions}>
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
