import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '../../../UI2/Input';
import Styles from './SuggestedIncrement.module.scss';

function SuggestedIncrement({
  months,
  effectiveAnnualInterestRate,
  increment,
}) {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <div className={Styles.label}>Meses de moderación</div>
        <div className={Styles.input}>
          <Input type="text" value={months} />
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Tasa E.A</div>
        <div className={Styles.input}>
          <Input type="text" value={effectiveAnnualInterestRate} />
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Incremento sugerido</div>
        <div className={Styles.value}>
          <NumberFormat
            value={parseFloat(increment).toFixed(2)}
            displayType={'text'}
            prefix={'$'}
            thousandSeparator={true}
          />
        </div>
      </div>
    </div>
  );
}

SuggestedIncrement.propTypes = {
  months: PropTypes.number,
  effectiveAnnualInterestRate: PropTypes.number,
  increment: PropTypes.number,
};

SuggestedIncrement.defaultProps = {
  months: 1,
  effectiveAnnualInterestRate: 0,
  increment: 0,
};

export default SuggestedIncrement;
