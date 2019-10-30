import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Styles from './InitialFees.module.scss';

function InitialFees({ firstSale, endOfSalesDate, firstSaleHandler }) {
  const yearEndOfSales = moment(Number(endOfSalesDate)).year();
  const monthEndOfSales = moment(Number(endOfSalesDate)).month();
  const yearNow = moment().year();
  const monthNow = moment().month();
  const endOfSalesDateFormatted = moment(`${yearEndOfSales}-${monthEndOfSales}`)
    .add(1, 'month')
    .format('x');
  const nowFormatted = moment(`${yearNow}-${monthNow}`).format('x');
  return (
    <Card>
      <CardHeader>
        <span>Plazos cuota inicial</span>
      </CardHeader>
      <CardBody>
        <div className={Styles.Container}>
          <span className={Styles.Item}>Plazo primer comprador:</span>
          <Input
            className={Styles.Item}
            validations={[]}
            value={firstSale}
            onChange={(target) => {
              firstSaleHandler(target.value);
            }}
          />
          <span className={Styles.Item}>Plazo hoy:</span>{' '}
          <span className={`${Styles.Item} ${Styles.Deadline}`}>
            {moment(Number(endOfSalesDateFormatted)).diff(
              moment(Number(nowFormatted)),
              'month',
            )}
          </span>
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
