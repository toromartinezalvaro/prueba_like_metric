import React from 'react';
import Card, { CardHeader, CardBody } from '../UI/Card/Card';

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
            <div>
              {salesSpeed.name}{' '}
              <input
                value={salesSpeed.futureSalesSpeed}
                onChange={event => {
                  futureSalesSpeedHandler(salesSpeed.id, event.target.value);
                }}
              />
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default futureSalesSpeed;
