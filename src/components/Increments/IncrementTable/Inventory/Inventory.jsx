import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Input from '../../../UI/Input/Input';
import Styles from './Inventory.module.scss';
import Numbers from '../../../../helpers/numbers';
import SalesWizard from '../SalesWizard';

function Inventory({
  group,
  inputValidations,
  index,
  className,
  groupSummary,
  putSuggestedSalesSpeed,
  putSuggestedEffectiveAnnualInterestRate,
  futureSalesSpeedHandler,
  validations,
  blockIncrements,
  salesStartDate,
  totalUnits,
  groupId,
  endOfSalesDate,
  putIncrement,
  isReset,
  salesIncrement,
}) {
  const endOfSales = moment(Number(endOfSalesDate))
    .startOf('month')
    .diff(moment().startOf('month'), 'months');

  const {
    units,
    averageArea,
    averagePrice,
    pricePerMT2,
    l0,
    increment,
    estimatedSales,
    incrementRate,
    retentionMonths,
    ear,
    suggestedEffectiveAnnualInterestRate,
    suggestedIncrement,
    averageSalesPerMT2,
    basePricePerMT2,
    basePrice,
    salesSpeed,
  } = groupSummary;

  const [salesSpeedState, setSalesSpeedState] = useState(salesSpeed);
  const [isModalOpen, setModalOpen] = useState(false);

  const limitTodayDate =
    retentionMonths -
    moment()
      .startOf('month')
      .diff(moment(Number(salesStartDate)).startOf('month'), 'month');

  let incrementTextColor = Styles['inv-increment-goal'];
  if (increment < 0) {
    incrementTextColor = Styles['inv-increment-goal-text-red'];
  }

  const futureSpeedValidation = () => [
    {
      fn: (value) => value >= 0,
      message: 'Debe ser mayor 0',
    },
    {
      fn: (value) => units / value <= 98,
      message: 'El numero de periodos no puede ser mayor a 98',
    },
    {
      fn: (value) => value <= units,
      message: 'Debe ser menor a las unidades',
    },
  ];
  return (
    <div className={`${Styles.inventory} ${className}`}>
      <div className={Styles['inv-header']}>Inventario</div>
      <div className={Styles['inv-date']} />
      <div className={Styles['inv-units']}>
        <span>{units}</span>
      </div>
      <div className={Styles['inv-area']}>
        <NumberFormat
          value={averageArea.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          suffix="m²"
        />
      </div>
      <div className={Styles['inv-price']}>
        <NumberFormat
          value={averagePrice.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-price-m2']}>
        <NumberFormat
          value={pricePerMT2.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-sales-l0']}>
        <NumberFormat
          value={l0.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={incrementTextColor}>
        {blockIncrements ? (
          <span>No se puede incrementar con 1 unidad</span>
        ) : (
          <>
            <Input
              mask="currency"
              style={{ textAlign: 'left' }}
              validations={[
                {
                  fn: (value) => value !== '.',
                  message: 'Debe ingresar un numero',
                },
              ]}
              value={increment && increment.toFixed(2)}
              onChange={(target) => {
                putIncrement(Number(target.value) + salesIncrement);
              }}
              disable={units === 0 || !isReset}
              updateWithProp
            />
            <Tooltip
              title="Abrir ayuda ventas"
              onClick={() => setModalOpen(true)}
            >
              <span className={Styles.Badge}>?</span>
            </Tooltip>
          </>
        )}
      </div>
      <div className={Styles['inv-sales-future']}>
        <NumberFormat
          value={estimatedSales && estimatedSales.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-sales-average']}>
        <NumberFormat
          value={averageSalesPerMT2 && averageSalesPerMT2.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-increment-base']}>
        <NumberFormat
          value={(incrementRate * 100).toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          suffix="%"
        />
      </div>
      <div className={Styles['inv-analysis-inverse']} />
      <div className={Styles['inv-inventory-base-price-mt2']}>
        <NumberFormat
          value={basePricePerMT2 && basePricePerMT2.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-inventory-base-price']}>
        <NumberFormat
          value={basePrice && basePrice.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-speed-sales']}>
        <Input
          validations={[
            ...futureSpeedValidation(),
            {
              fn: (value) => units / value < endOfSales,
              message: `Este valor supera el plazo de cuota inicial a hoy`,
            },
          ]}
          value={salesSpeedState}
          style={{ width: '75px' }}
          onChange={(target) => {
            setSalesSpeedState(target.value);
            futureSalesSpeedHandler(
              groupId,
              Numbers.toFixed(Number(target.value)),
            );
          }}
        />
      </div>
      <div className={Styles['inv-retention-months']}>
        <div>
          <span>Meses de retencion: </span>
          <span>{retentionMonths}</span>
        </div>
        -
        <div>
          <span>Plazo cuota inicial hoy: </span>
          {endOfSales}
        </div>
      </div>
      <div className={Styles['inv-ear']}>
        <span>{(ear * 100).toFixed(2)}%</span>
      </div>
      <SalesWizard
        data={group}
        validations={[
          ...inputValidations,
          {
            fn: (value) =>
              value <= moment(Number(group.sales.date)).diff(moment(), 'month'),
            message: 'Los meses de retencion superan la fecha final de ventas',
          },
        ]}
        putSuggestedEffectiveAnnualInterestRate={(
          effectiveAnnualInterestRate,
        ) => {
          putSuggestedEffectiveAnnualInterestRate(
            group.id,
            effectiveAnnualInterestRate,
            index,
          );
        }}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        isReset={group.isReset}
        putIncrement={(incrementP) => {
          putIncrement(
            group.id,
            incrementP,
            group.inventory.units,
            group.sales.increment,
          );
        }}
        salesIncrement={group.sales.increment}
      />
    </div>
  );
}

Inventory.propTypes = {
  className: PropTypes.string,
  groupSummary: PropTypes.exact({
    units: PropTypes.number,
    averageArea: PropTypes.number,
    averagePrice: PropTypes.number,
    pricePerMT2: PropTypes.number,
    l0: PropTypes.number,
    increment: PropTypes.number,
    estimatedSales: PropTypes.number,
    incrementRate: PropTypes.number,
    suggestedIncrement: PropTypes.number,
    retentionMonths: PropTypes.number,
    ear: PropTypes.number,
  }).isRequired,
  putSuggestedSalesSpeed: PropTypes.func.isRequired,
  putSuggestedEffectiveAnnualInterestRate: PropTypes.func.isRequired,
  validations: PropTypes.array,
  blockIncrements: PropTypes.bool,
  salesStartDate: PropTypes.number,
};

Inventory.defaultProps = {
  className: '',
  validations: [],
  blockIncrements: false,
  salesStartDate: new Date().getTime(),
};

export default Inventory;
