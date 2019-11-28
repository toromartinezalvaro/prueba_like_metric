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
import MonthEnum from './month.enum';
import YearEnum from './year.enum';
import Events from '../../../../../containers/Events/Events';

import styles from './BillingFinancials.module.scss';

const BillingFinancials = ({ sendBillings, towerId, events, currentEvent }) => {
  const cardValue = {
    id: 0,
    event: null,
    billingCycle: 'Una vez',
    billingAmount: 0,
    description: '',
    lastBillingDate: `${new Date()}`,
    isLocked: false,
  };
  const [billings, setBillings] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [month, setMonth] = useState(MonthEnum);
  const [disabledLastBilling, setDisableLastBilling] = useState(true);

  let totalBills = 0;

  const changeCardValue = (name, id, isDate, isSelect, isEvent) => (e) => {
    const billingsArray = [...billings];
    const billIndex = billings.findIndex((element) => {
      return element.id === id;
    });

    let bill = {};

    if (isDate) {
      bill = { ...billingsArray[billIndex], [name]: e };
    } else if (isSelect) {
      let filterMonths = [];
      if (e.value === 1) {
        setDisableLastBilling(true);
        bill = { ...billingsArray[billIndex], [name]: e.label };
      }
      if (e.value === 2) {
        filterMonths = MonthEnum;
        setDisableLastBilling(false);
        setMonth(filterMonths);
        bill = { ...billingsArray[billIndex], [name]: e.label };
      }
      if (e.value === 3) {
        setDisableLastBilling(false);
        const tempo = MonthEnum.map((months) => {
          return (
            months.value % 3 === 0 &&
            filterMonths.push({
              value: months.value,
              label: months.label,
            })
          );
        });
        setMonth(filterMonths);
        bill = { ...billingsArray[billIndex], [name]: e.label };
      }
      if (e.value === 4) {
        setDisableLastBilling(false);
        const tempo = MonthEnum.map(() => {
          return [];
        });
        setMonth(filterMonths);
        bill = { ...billingsArray[billIndex], [name]: e.label };
      }
    } else if (isEvent) {
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

  const lastDate = (name) => (e) => {};

  const suggestions = [
    { label: 'Una vez', value: 1 },
    { label: 'Mensual', value: 2 },
    { label: 'Trimestral', value: 3 },
    { label: 'Anual', value: 4 },
  ].map((suggestion) => ({
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
          zIndex: 1000,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  const displayComponent = () => {
    return billings.map((billing) => {
      totalBills += parseInt(billing.billingAmount);
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
                    label: 'Evento a Facturar',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                  }}
                  placeholder="Evento a Facturar"
                  components={Option}
                  options={events}
                  onChange={changeCardValue(
                    'event',
                    billing.id,
                    false,
                    false,
                    true,
                  )}
                />
                <Events currentEvent={currentEvent} towerId={towerId} disabled={billing.isLocked} />

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
                />

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
                    <h4 sclassName={styles.textTotal}> Valor de cuenta:</h4>
                    <p className={styles.amount}>{billing.billingAmount * 1}</p>
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
          <p className={styles.TotalAmount}>{totalBills} COP</p>
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
