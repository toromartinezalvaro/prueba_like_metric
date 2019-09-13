import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../UI/Input/Input';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './IncrementsMarket.module.scss';

function IncrementsMarket({
  marketData,
  putMarketAveragePrice,
  putMarketAnnualEffectiveIncrement,
}) {
  const { averagePrice, anualEffectiveIncrement } = marketData;
  return (
    <Card>
      <CardHeader>
        <span>Valores del mercado</span>
      </CardHeader>
      <CardBody>
        <div className={styles.MarketInputs}>
          <div className={styles.MarketInput}>
            <div className={styles.MarketInputLabel}>Precio promedio del mercado sin adicionales</div>
            <div>
              <Input
                mask="currency"
                onChange={(target) => {
                  putMarketAveragePrice(target.value);
                }}
                validations={[]}
                style={{ width: '100px' }}
                value={averagePrice}
              />
            </div>
          </div>

          <div className={styles.MarketInput}>
            <div className={styles.MarketInputLabel}>E.A</div>
            <div>
              <Input
                mask="percentage"
                onChange={(target) => {
                  putMarketAnnualEffectiveIncrement(
                    parseFloat(target.value) / 100,
                  );
                }}
                validations={[]}
                style={{ width: '100px' }}
                value={anualEffectiveIncrement * 100}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

IncrementsMarket.propTypes = {
  marketData: PropTypes.object,
  putMarketAveragePrice: PropTypes.func.isRequired,
  putMarketAnnualEffectiveIncrement: PropTypes.func.isRequired,
};

IncrementsMarket.defaultProps = {
  marketData: { averagePrice: 0, anualEffectiveIncrement: 0 },
};

export default IncrementsMarket;
