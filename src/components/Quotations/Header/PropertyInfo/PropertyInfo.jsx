import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './PropertyInfo.module.scss';

const PropertyInfo = ({
  property,
  propertyPrice,
  initialFeePercentage,
  reservePercentage,
  periods,
}) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <span>Apartamento:</span>
      </div>
      <div className={Styles.rate}>
        <span>{property.name}</span>
      </div>
      <div></div>
      <div className={Styles.title}>
        <span>Cuota inicial:</span>
      </div>
      <div className={Styles.rate}>
        <span>{(initialFeePercentage * 100).toFixed(2)}%</span>
      </div>
      <div className={Styles.value}>
        <NumberFormat
          value={(propertyPrice * initialFeePercentage).toFixed(2)}
          displayType="text"
          thousandSeparator
          prefix="$"
        />
      </div>

      <div className={Styles.title}>
        <span>Separación:</span>
      </div>
      <div className={Styles.rate}>
        <span>{(reservePercentage * 100).toFixed(2)}%</span>
      </div>
      <div className={Styles.value}>
        <NumberFormat
          value={(propertyPrice * reservePercentage).toFixed(2)}
          displayType="text"
          thousandSeparator
          prefix="$"
        />
      </div>

      <div className={Styles.title}>
        <span>Cuotas mensuales:</span>
      </div>
      <div className={Styles.rate}>
        <span>{periods}</span>
      </div>
      <div className={Styles.value}>
        <span>
          <NumberFormat
            value={(propertyPrice / periods).toFixed(2)}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </span>
      </div>

      <div className={Styles.title}>
        <span>Pago final:</span>
      </div>
      <div className={Styles.rate}>
        <span>{((1 - initialFeePercentage) * 100).toFixed(2)}%</span>
      </div>
      <div className={Styles.value}>
        <span>
          <NumberFormat
            value={(propertyPrice * (1 - initialFeePercentage)).toFixed(2)}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </span>
      </div>
    </div>
  );
};

PropertyInfo.propTypes = {
  property: PropTypes.shape({
    name: PropTypes.string,
  }),
  propertyPrice: PropTypes.number,
  initialFeePercentage: PropTypes.number,
  reservePercentage: PropTypes.number,
  periods: PropTypes.number,
};

PropertyInfo.defaultProps = {
  property: {
    name: '',
  },
  propertyPrice: 0,
  initialFeePercentage: 0,
  reservePercentage: 0,
  periods: 0,
};

export default PropertyInfo;
