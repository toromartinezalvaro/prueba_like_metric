import React from 'react';
import Input from '../../UI/Input/Input';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './IncrementsMarket.module.scss';

const incrementsMarket = ({
  marketData,
  putMarketAveragePrice,
  putMarketAnnualEffectiveIncrement,
  ...rest
}) => {
  return (
    <Card>
      <CardHeader>
        <span>Valores del mercado</span>
      </CardHeader>
      <CardBody>
        <div className={styles.MarketInputs}>
          <div className={styles.MarketInput}>
            <div className={styles.MarketInputLabel}>Precio promedio</div>
            <div>
              <Input
                mask="currency"
                onChange={target => {
                  putMarketAveragePrice(target.value);
                }}
                validations={[]}
                style={{ width: '100px' }}
                value={marketData.averagePrice}
              />
            </div>
          </div>

          <div className={styles.MarketInput}>
            <div className={styles.MarketInputLabel}>E.A</div>
            <div>
              <Input
                mask="percentage"
                onChange={target => {
                  putMarketAnnualEffectiveIncrement(
                    parseFloat(target.value) / 100,
                  );
                }}
                validations={[]}
                style={{ width: '100px' }}
                value={marketData.anualEffectiveIncrement * 100}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default incrementsMarket;
