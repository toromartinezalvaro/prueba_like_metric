import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import styles from './DisplacementDates.module.scss';

function InitialFees({}) {
  return (
    <Card>
      <CardHeader>
        <span>Desplazamiento</span>
      </CardHeader>
      <CardBody>
        <div className={styles.Container}>
          <div className={styles.Title}>Fecha Inicio Construcción</div>
          <span>Desplazamiento</span>
          <span>Fecha</span>
        </div>

        <Input></Input>
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
