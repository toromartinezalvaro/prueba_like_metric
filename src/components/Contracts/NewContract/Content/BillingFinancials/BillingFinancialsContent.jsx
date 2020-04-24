import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import styles from './BillingFinancials.module.scss';

const BillingFinancialsContent = ({ billing, i }) => {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.tittlePayment}>Forma de pago N°{i + 1}</h3>
      <div className={styles.containerPaymentInformation}>
        <div className={styles.resumeLabel2}>
          <h4>Valor antes del IVA total:</h4>
          <NumberFormat
            className={styles.resumeValue}
            value={(
              Number(billing.amount) * Number(billing.paymentNumber)
            ).toFixed(0)}
            displayType="text"
            thousandSeparator
            decimalSeparator={false}
            prefix="$"
          />
        </div>
        <div className={styles.resumeLabel3}>
          <h4>Valor de IVA total:</h4>
          <NumberFormat
            className={styles.resumeValue}
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
        <div className={styles.resumeLabel}>
          <h4>Valor despues de IVA total:</h4>
          <NumberFormat
            className={styles.resumeValue}
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

BillingFinancialsContent.propTypes = {
  billing: PropTypes.object,
  i: PropTypes.number,
};

export default BillingFinancialsContent;
