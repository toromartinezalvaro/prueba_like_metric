import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';

function InitialFees({ firstSale, toToday, lastSale, ...rest }) {
  return (
    <Card>
      <CardHeader>
        <span>Plazos cuota inicial</span>
      </CardHeader>
      <CardBody>
        <div>
          <span>Plazo primer comprado:</span> <span>{firstSale}</span>
        </div>
        <div>
          <span>Plazo hoy:</span> <span>{toToday}</span>
        </div>
        <div>
          <span>Plazo ultima venta:</span> <span>{lastSale}</span>
        </div>
      </CardBody>
    </Card>
  );
}

InitialFees.propTypes = {
  firstSale: PropTypes.number,
  toToday: PropTypes.number,
  lastSale: PropTypes.number,
};

InitialFees.defaultProps = {
  firstSale: 36,
  toToday: 36,
  lastSale: 6,
};

export default InitialFees;
