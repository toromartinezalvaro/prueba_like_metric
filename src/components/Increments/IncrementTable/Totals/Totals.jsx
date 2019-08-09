import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Totals.module.scss';

function Totals({ className, groupSummary }) {
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
    suggestedIncrement,
  } = groupSummary;
  return (
    <div className={`${Styles.total} ${className}`}>
      <div className={Styles['total-header']}>Total</div>
      <div className={Styles['total-date']} />
      <div className={Styles['total-units']}>{units}</div>
      <div className={Styles['total-area']}>{averageArea}</div>
      <div className={Styles['total-price']}>{averagePrice}</div>
      <div className={Styles['total-price-m2-addons']}>{pricePerMT2}</div>
      <div className={Styles['total-price-m2']}>{l0}</div>
      <div className={Styles['total-sales-l0']}>Borrar</div>
      <div className={Styles['total-increment-goal']}>{increment}</div>
      <div className={Styles['total-sales-future']}>{estimatedSales}</div>
      <div className={Styles['total-increment-base']}>{incrementRate}</div>
      <div className={Styles['total-analysis-inverse']} />
      <div className={Styles['total-retention-months']}>{retentionMonths}</div>
      <div className={Styles['total-ear']}></div>
      <div className={Styles['total-sales-wizard']} />
      <div className={Styles['total-inventory-retention']}>
        
      </div>
      <div className={Styles['total-ear-suggestion']}></div>
      <div className={Styles['total-increment-goal-suggestion']}>
        {suggestedIncrement}
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
};

Totals.defaultProps = {
  className: '',
};

export default Totals;
