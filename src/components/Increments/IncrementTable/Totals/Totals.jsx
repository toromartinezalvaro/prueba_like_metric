import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '../../../UI/Input/Input';
import Styles from './Totals.module.scss';

function Totals({ className, groupSummary, putIncrement, putSalesSpeed }) {
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
    suggestedIncrement,
  } = groupSummary;
  return (
    <div className={`${Styles.total} ${className}`}>
      <div className={Styles['total-header']}>Total</div>
      <div className={Styles['total-date']}>...</div>
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
        <Input
          mask="currency"
          validations={[]}
          value={increment.toFixed(2)}
          onChange={(target) => {
            putIncrement(target.value);
          }}
        />
      </div>
      <div className={Styles['total-sales-future']}>
        <NumberFormat
          value={estimatedSales.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className={Styles['total-increment-base']}>
        <NumberFormat
          value={incrementRate.toFixed(2) * 100}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'%'}
        />
      </div>
      <div className={Styles['total-analysis-inverse']} />
      <div className={Styles['total-retention-months']}>
        <Input
          validations={[]}
          value={retentionMonths}
          onChange={(target) => {
            putSalesSpeed(target.value);
          }}
        />
      </div>
      <div className={Styles['total-ear']}>
        <NumberFormat
          value={ear.toFixed(2) * 100}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'%'}
        />
      </div>
      <div className={Styles['total-sales-wizard']} />
      <div className={Styles['total-inventory-retention']} />
      <div className={Styles['total-ear-suggestion']} />
      <div className={Styles['total-increment-goal-suggestion']}>
        <NumberFormat
          value={suggestedIncrement.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
    </div>
  );
}

Totals.propTypes = {
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
  }).isRequired,
  putIncrement: PropTypes.func.isRequired,
  putSalesSpeed: PropTypes.func.isRequired,
};

Totals.defaultProps = {
  className: '',
};

export default Totals;
