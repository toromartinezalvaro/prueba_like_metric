import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Input from '../../../UI2/Input';
import Styles from './Increments.module.scss';

function Increments({ raised, toCollect, goal }) {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <div className={Styles.label}>Incremento recaudado</div>
        <div className={Styles.value}>
          <NumberFormat
            value={parseFloat(raised).toFixed(2)}
            displayType={'text'}
            prefix={'$'}
            thousandSeparator={true}
          />
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Incremento por recaudado</div>
        <div className={Styles.value}>
          <NumberFormat
            value={parseFloat(toCollect).toFixed(2)}
            displayType={'text'}
            prefix={'$'}
            thousandSeparator={true}
          />
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Meta de incremento</div>
        <div className={Styles.value}>
          <Input value={goal} />
        </div>
      </div>
    </div>
  );
}

Increments.propTypes = {
  raised: PropTypes.number,
  toCollect: PropTypes.number,
  goal: PropTypes.number,
};

Increments.defaultProps = {
  raised: 0,
  toCollect: 0,
  goal: 0,
};

export default Increments;
