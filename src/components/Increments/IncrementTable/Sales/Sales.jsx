import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Sales.module.scss';

function Sales({
  className,
  date,
  units,
  area,
  price,
  priceM2WithAddons,
  priceM2,
  salesL0,
  incrementGoal,
  salesFuture,
  incrementBase,
  retentionMonths,
  ear,
  inventoryRetention,
  earSuggestion,
  incrementGoalSuggestion,
}) {
  return (
    <div className={`${Styles.sold} ${className}`}>
      <div className={Styles['sold-header']}>Vendidas</div>
      <div className={Styles['sold-date']}>{date}</div>
      <div className={Styles['sold-units']}>{units}</div>
      <div className={Styles['sold-area']}>{area}</div>
      <div className={Styles['sold-price']}>{price}</div>
      <div className={Styles['sold-price-m2-addons']}>{priceM2WithAddons}</div>
      <div className={Styles['sold-price-m2']}>{priceM2}</div>
      <div className={Styles['sold-sales-l0']}>{salesL0}</div>
      <div className={Styles['sold-increment-goal']}>{incrementGoal}</div>
      <div className={Styles['sold-sales-future']}>{salesFuture}</div>
      <div className={Styles['sold-increment-base']}>{incrementBase}</div>
      <div className={Styles['sold-analysis-inverse']} />
      <div className={Styles['sold-retention-months']}>{retentionMonths}</div>
      <div className={Styles['sold-ear']}>{ear}</div>
      <div className={Styles['sold-sales-wizard']} />
      <div className={Styles['sold-inventory-retention']}>
        {inventoryRetention}
      </div>
      <div className={Styles['sold-ear-suggestion']}>{earSuggestion}</div>
      <div className={Styles['sold-increment-goal-suggestion']}>
        {incrementGoalSuggestion}
      </div>
    </div>
  );
}

Sales.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  units: PropTypes.number,
  area: PropTypes.number,
  price: PropTypes.number,
  priceM2WithAddons: PropTypes.number,
  priceM2: PropTypes.number,
  salesL0: PropTypes.number,
  incrementGoal: PropTypes.number,
  salesFuture: PropTypes.number,
  incrementBase: PropTypes.number,
  retentionMonths: PropTypes.number,
  ear: PropTypes.number,
  inventoryRetention: PropTypes.number,
  earSuggestion: PropTypes.number,
  incrementGoalSuggestion: PropTypes.number,
};

Sales.defaultProps = {
  className: '',
  date: '',
  units: 0,
  area: 0,
  price: 0,
  priceM2WithAddons: 0,
  priceM2: 0,
  salesL0: 0,
  incrementGoal: 0,
  salesFuture: 0,
  incrementBase: 0,
  retentionMonths: 0,
  ear: 0,
  inventoryRetention: 0,
  earSuggestion: 0,
  incrementGoalSuggestion: 0,
};

export default Sales;
