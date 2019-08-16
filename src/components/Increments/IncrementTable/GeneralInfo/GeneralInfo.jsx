import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './GeneralInfo.module.scss';

function GeneralInfo({ units, averageArea, averagePrice }) {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.container}>
        <div className={Styles.label}>Unidades:</div>
        <div className={Styles.value}>
          <span>{units}</span>
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Area Promedio:</div>
        <div className={Styles.value}>
          <NumberFormat
            value={parseFloat(averageArea).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            suffix=" m²"
          />
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.label}>Precio Promedio (Sin primas):</div>
        <div className={Styles.value}>
          <NumberFormat
            value={parseFloat(averagePrice).toFixed(2)}
            displayType={'text'}
            prefix={'$'}
            thousandSeparator={true}
          />
        </div>
      </div>
    </div>
  );
}

GeneralInfo.propTypes = {
  units: PropTypes.number,
  averageArea: PropTypes.number,
  averagePrice: PropTypes.number,
};

GeneralInfo.defaultProps = {
  units: 0,
  averageArea: 0,
  averagePrice: 0,
};

export default GeneralInfo;
