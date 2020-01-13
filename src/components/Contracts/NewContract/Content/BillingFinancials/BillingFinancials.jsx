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
  const cardValue = {
    id: 0,
    eventId: null,
    cycle: 'Pago Único',
    amount: 0,
    description: '',
    lastBillingDate: `${moment(new Date())
      .toDate()
      .getTime()}`,
    iva: 19,
    isLocked: false,
  };
  const [billings, setBillings] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [month, setMonth] = useState(MonthEnum);
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
      bill = { ...billingsArray[billIndex], [name]: element };
    } else if (elementIsASelect) {
      let filterMonths = [];
      let tempo;
      switch (element.value) {
        case 1:
          setDisableLastBilling(true);
          bill = { ...billingsArray[billIndex], [name]: element.label };
          break;
        case 2:
          filterMonths = MonthEnum;
          setDisableLastBilling(false);
          setMonth(filterMonths);
          bill = { ...billingsArray[billIndex], [name]: element.label };
          break;
        case 3:
          setDisableLastBilling(false);
          tempo = MonthEnum.map((months) => {
            return (
              months.value % 3 === 0 &&
              filterMonths.push({
                value: months.value,
                label: months.label,
              })
            );
          });
          setMonth(filterMonths);
          bill = { ...billingsArray[billIndex], [name]: element.label };
          break;
        case 4:
          setDisableLastBilling(false);
          tempo = MonthEnum.map(() => {
            return [];
          });
          setMonth(filterMonths);
          bill = { ...billingsArray[billIndex], [name]: element.label };
          break;
        default:
          break;
      }
    } else if (elementIsAnEvent) {
      bill = { ...billingsArray[billIndex], [name]: element.value };
    } else if (name === true) {
      bill = { ...billingsArray[billIndex], isLocked: true };
    } else if (name === false) {
      bill = { ...billingsArray[billIndex], isLocked: false };
    } else {
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

  const lastDate = (name) => (e) => {};

  const suggestions = SuggestionEnum.map((suggestion) => ({
    value: suggestion.value,
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
      totalBills += parseInt(billing.amount);
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
                <Select
                  className={styles.Select}
                  inputId="react-select-single"
                  isDisabled={billing.isLocked}
                  TextFieldProps={{
                    label: 'Evento a Facturar',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="Evento a Facturar"
                  components={Option}
                  options={events}
                  defaultValue={
                    dataIfEdit &&
                    events.find((option) => {
                      return (
                        option.value === billing.eventId && {
                          value: billing.eventId,
                        }
                      );
                    })
                  }
                  onChange={changeCardValue(
                    'eventId',
                    billing.id,
                    false,
                    false,
                    true,
                  )}
                />
                <Events
                  currentEvent={currentEvent}
                  towerId={towerId}
                  disabled={billing.isLocked}
                />
                <TextField
                  disabled={billing.isLocked}
                  className={styles.textField}
                  label="Descripción"
                  margin="normal"
                  variant="outlined"
                  defaultValue={billing.description}
                  onChange={changeCardValue('description', billing.id)}
                />
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

                  <NumberFormat
                    value={Numbers.toFixed(
                      billing.amount * (billing.iva / 100),
                    )}
                    displayType={'text'}
                    className={styles.TotalAmount}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </div>

                <div className={styles.cardForm}>
                  <div className={styles.column}>
                    <div className={styles.container}>
                      <h3 className={styles.lastBillingText}>Fecha final:</h3>
                      <div className={styles.leftPick}>
                        <Select
                          className={styles.selectLeft}
                          inputId="react-select-single"
                          isDisabled={billing.isLocked || disabledLastBilling}
                          TextFieldProps={{
                            label: 'Mes',
                            InputLabelProps: {
                              htmlFor: 'react-select-single',
                              shrink: true,
                            },
                          }}
                          options={month}
                          placeholder="Mes"
                          components={Option}
                          onChange={lastDate('month')}
                        />
                      </div>
                      <div className={styles.rigthPick}>
                        <Select
                          className={styles.selectRight}
                          inputId="react-select-single"
                          isDisabled={billing.isLocked || disabledLastBilling}
                          TextFieldProps={{
                            label: 'Año',
                            InputLabelProps: {
                              htmlFor: 'react-select-single',
                              shrink: true,
                            },
                          }}
                          placeholder="Año"
                          components={Option}
                          options={YearEnum}
                          onChange={lastDate('year')}
                        />
                      </div>
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
                        billing.amount - billing.amount * (billing.iva / 100),
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
