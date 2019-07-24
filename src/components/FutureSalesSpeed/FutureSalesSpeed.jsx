import React from 'react';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';
import Input from '../../components/UI/Input/Input';
import styles from './FutureSalesSpeed.module.scss'

const futureSalesSpeed = ({
  salesSpeeds,
  futureSalesSpeedHandler,
  ...rest
}) => {
  return (
    <Card>
      <CardHeader>
        <span>Velocidad de ventas futuras</span>
      </CardHeader>
      <CardBody>
        {salesSpeeds.map(salesSpeed => {
          return (
            <div className={styles.InputGroup}>
              <div>{salesSpeed.name}</div>
              <div>
                <Input
                  validations={[]}
                  value={salesSpeed.futureSalesSpeed}
                  style={{ width: '75px' }}
                  onChange={target => {
                    futureSalesSpeedHandler(salesSpeed.id, target.value);
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default futureSalesSpeed;
