import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Numbers from '../../../../helpers/numbers';
import style from '../ViewContractInformation.module.scss';

const BillingContent = ({ billing, i }) => {
  return (
    <div className={style.cardContainer}>
      <h3 className={style.tittlePayment}>Forma de pago N°{i + 1}</h3>
      <div className={style.containerPaymentInformation}>
        <div className={style.resumeLabel2}>
          <h4 className={style.ivaTitle}>Valor antes del IVA total:</h4>
          <NumberFormat
            className={style.resumeValue}
            value={(
              Number(billing.amount) * Number(billing.paymentNumber)
            ).toFixed(0)}
            displayType="text"
            thousandSeparator
            decimalSeparator={false}
            prefix="$"
          />
        </div>
        <div className={style.resumeLabel3}>
          <h4 className={style.ivaTitle}>Valor de IVA total:</h4>
          <NumberFormat
            className={style.resumeValue}
            value={(
              Number(billing.amount) *
              (Number(billing.iva) / 100) *
              Number(billing.paymentNumber)
            ).toFixed(0)}
            displayType="text"
            decimalSeparator={false}
            thousandSeparator
            prefix="$"
          />
        </div>
        <div className={style.resumeLabel}>
          <h4 className={style.ivaTitle}>Valor despues de IVA total:</h4>
          <NumberFormat
            className={style.resumeValue}
            value={(
              (Number(billing.amount) +
                Number(billing.amount) * (Number(billing.iva) / 100)) *
              Number(billing.paymentNumber)
            ).toFixed(0)}
            displayType="text"
            decimalSeparator={false}
            thousandSeparator
            prefix="$"
          />
        </div>
      </div>
    </div>
  );
};

BillingContent.propTypes = {
  billing: PropTypes.object,
  i: PropTypes.number,
};

export default BillingContent;
