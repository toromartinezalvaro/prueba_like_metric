import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Input from '../../../UI/Input/Input';
import Styles from './Inventory.module.scss';

function Inventory({
  className,
  groupSummary,
  putSuggestedSalesSpeed,
  putSuggestedEffectiveAnnualInterestRate,
  validations,
  blockIncrements,
  salesStartDate,
}) {
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
  } = groupSummary;
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
      <div className={Styles['inv-increment-goal']}>
        <NumberFormat
          value={increment.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['inv-sales-future']}>
        <NumberFormat
          value={estimatedSales.toFixed(2)}
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
      <div className={Styles['inv-retention-months']}>
        <Input
          validations={validations}
          value={retentionMonths}
          onChange={(target) => {
            putSuggestedSalesSpeed(target.value);
          }}
        />

        <div>
          <span>Meses a hoy: </span>
          {retentionMonths -
            moment().diff(moment(Number(salesStartDate)), 'month')}
        </div>
      </div>
      <div className={Styles['inv-ear']}>
        <span>{(ear * 100).toFixed(2)}%</span>
      </div>
      
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
