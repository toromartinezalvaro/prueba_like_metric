import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Styles from './InitialFees.modules.scss';

function InitialFees({ firstSale, endOfSalesDate, firstSaleHandler }) {
  return (
    <Card>
      <CardHeader>
        <span>Plazos cuota inicial</span>
      </CardHeader>
      <CardBody>
        <div className={Styles.container}>
          <div>
            <span>Plazo primer comprado:</span>
          </div>
          <div>
            <Input
              validations={[]}
              value={firstSale}
              onChange={(target) => {
                firstSaleHandler(target.value);
              }}
            />
          </div>
        </div>
        <div>
          <span>Plazo hoy:</span>{' '}
          <span>{moment(Number(endOfSalesDate)).diff(moment(), 'month')}</span>
        </div>
        {/* <div>
          <span>Plazo ultima venta:</span> <span>0</span>
        </div> */}
      </CardBody>
    </Card>
  );
}

InitialFees.propTypes = {
  firstSale: PropTypes.number,
  salesStartDate: PropTypes.number,
  firstSaleHandler: PropTypes.func,
};

InitialFees.defaultProps = {
  firstSale: 0,
  salesStartDate: 0,
  firstSaleHandler: () => null,
};

export default InitialFees;
