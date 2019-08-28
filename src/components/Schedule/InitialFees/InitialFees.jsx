import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Styles from './InitialFees.module.scss';

function InitialFees({ firstSale, endOfSalesDate, firstSaleHandler }) {
  return (
    <Card>
      <CardHeader>
        <span>Plazos cuota inicial</span>
      </CardHeader>
      <CardBody>
        <div className={Styles.Container}>
            <span className={Styles.Item}>Plazo primer comprado:</span>
            <Input
              className={Styles.Item}
              validations={[]}
              value={firstSale}
              onChange={(target) => {
                firstSaleHandler(target.value);
              }}
            />

          <span className={Styles.Item}>Plazo hoy:</span>{' '}
          <span className={`${Styles.Item  } ${  Styles.Deadline}`}>{moment(Number(endOfSalesDate)).diff(moment(), 'month')}</span>
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
