import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '../../../UI/Input/Input';
import Styles from './Totals.module.scss';

function Totals({
  className,
  groupSummary,
  putIncrement,
  putSalesSpeed,
  validations,
  blockIncrements,
}) {
  const {
    date,
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
    suggestedIncrement,
  } = groupSummary;
  return (
    <div className={`${Styles.total} ${className}`}>
      <div className={Styles['total-header']}>Total</div>
      <div className={Styles['total-date']}>
        <span>
          {moment(Number(date))
            .locale('es')
            .format('DD-MMM-YY')}
        </span>
      </div>
      <div className={Styles['total-units']}>
        <span>{units}</span>
      </div>
      <div className={Styles['total-area']}>
        <NumberFormat
          value={averageArea.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'m²'}
        />
      </div>
      <div className={Styles['total-price']}>
        <NumberFormat
          value={averagePrice.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={Styles['total-price-m2']}>
        <NumberFormat
          value={pricePerMT2.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={Styles['total-sales-l0']}>
        <NumberFormat
          value={l0.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={Styles['total-increment-goal']}>
        {blockIncrements ? (
          <span>No se puede incrementar con 1 unidad</span>
        ) : (
          <Input
            mask="currency"
            validations={[
              {
                fn: (value) => value !== '.',
                message: 'Debe ingresar un numero',
              },
            ]}
            value={increment && increment.toFixed(2)}
            onChange={(target) => {
              putIncrement(target.value);
            }}
            updateWithProp
          />
        )}
      </div>
      <div className={Styles['total-sales-future']}>
        <NumberFormat
          value={estimatedSales && estimatedSales.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={Styles['total-increment-base']}>
        <NumberFormat
          value={(incrementRate * 100).toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'%'}
        />
      </div>
      <div className={Styles['total-analysis-inverse']} />
      <div className={Styles['total-retention-months']}>
        <Input
          validations={validations}
          value={retentionMonths}
          onChange={(target) => {
            putSalesSpeed(target.value);
          }}
        />
      </div>
      <div className={Styles['total-ear']}>
        <NumberFormat
          value={(ear * 100).toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'%'}
        />
      </div>
    </div>
  );
}

Totals.propTypes = {
  className: PropTypes.string,
  groupSummary: PropTypes.exact({
    date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  putIncrement: PropTypes.func.isRequired,
  putSalesSpeed: PropTypes.func.isRequired,
  validations: PropTypes.array,
  blockIncrements: PropTypes.bool,
};

Totals.defaultProps = {
  className: '',
  validations: [],
  blockIncrements: false,
};

export default Totals;
