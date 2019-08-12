import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './Sales.module.scss';

function Sales({ className, groupSummary }) {
  const {
    units,
    averageArea,
    averagePrice,
    pricePerMT2,
    l0,
    increment,
    estimatedSales,
    incrementRate,
    suggestedIncrement,
  } = groupSummary;
  return (
    <div className={`${Styles.sold} ${className}`}>
      <div className={Styles['sold-header']}>Vendidas</div>
      <div className={Styles['sold-date']}>...</div>
      <div className={Styles['sold-units']}>
        <span>{units}</span>
      </div>
      <div className={Styles['sold-area']}>
        <NumberFormat
          value={averageArea.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          suffix="m²"
        />
      </div>
      <div className={Styles['sold-price']}>
        <NumberFormat
          value={averagePrice.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['sold-price-m2']}>
        <NumberFormat
          value={pricePerMT2.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['sold-sales-l0']}>
        <NumberFormat
          value={l0.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['sold-increment-goal']}>
        <NumberFormat
          value={increment.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['sold-sales-future']}>
        <NumberFormat
          value={estimatedSales.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
      <div className={Styles['sold-increment-base']}>
        <NumberFormat
          value={incrementRate.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          suffix="%"
        />
      </div>
      <div className={Styles['sold-analysis-inverse']} />
      <div className={Styles['sold-retention-months']} />
      <div className={Styles['sold-ear']} />
      <div className={Styles['sold-sales-wizard']} />
      <div className={Styles['sold-inventory-retention']} />
      <div className={Styles['sold-ear-suggestion']} />
      <div className={Styles['sold-increment-goal-suggestion']}>
        <NumberFormat
          value={suggestedIncrement.toFixed(2)}
          displayType="text"
          thousandSeparator={true}
          prefix="$"
        />
      </div>
    </div>
  );
}

Sales.propTypes = {
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
};

Sales.defaultProps = {
  className: '',
};

export default Sales;
