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
    <div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Apartamento:</span>
        </div>
        <div className={Styles.value}>
          <span>{property.name}</span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Cuota inicial:</span>
        </div>
        <div className={Styles.value}>
          <span>{initialFeePercentage * 100}%</span>
        </div>
        <div>
          <NumberFormat
            value={propertyPrice * initialFeePercentage}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Separación:</span>
        </div>
        <div className={Styles.value}>
          <span>{reservePercentage * 100}%</span>
        </div>
        <div>
          <NumberFormat
            value={propertyPrice * reservePercentage}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Cuotas mensuales:</span>
        </div>
        <div className={Styles.value}>
          <span>{periods}</span>
        </div>
        <div>
          <span>
            <NumberFormat
              value={propertyPrice / periods}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </span>
        </div>
      </div>
      <div className={Styles.infoContainer}>
        <div className={Styles.title}>
          <span>Pago final:</span>
        </div>
        <div className={Styles.value}>
          <span>{(1 - initialFeePercentage) * 100}%</span>
        </div>
        <div>
          <span>
            <NumberFormat
              value={propertyPrice * (1 - initialFeePercentage)}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </span>
        </div>
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
