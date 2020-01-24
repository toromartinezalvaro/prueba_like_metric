import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Styles from './Prices.module.scss';

const Prices = ({ property }) => {
  return (
    <div className={Styles.priceContainer}>
      <div className={Styles.container}>
        <span className={Styles.title}>Precios</span>
        <div className={Styles.content}>
          <div className={Styles.stat}>
            <span className={Styles.label}>Inmueble:</span>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={property.basePrice.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.stat}>
            <span className={Styles.label}>Adicionales:</span>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={property.additionalAreasPrice.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.stat}>
            <span className={Styles.label}>Total:</span>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              value={(
                property.basePrice + property.additionalAreasPrice
              ).toFixed(2)}
              displayType="text"
            />
          </div>
        </div>
      </div>
      <div className={Styles.container}>
        <span className={Styles.title}>Dimensiones</span>
        <div className={Styles.content}>
          <div className={Styles.stat}>
            <span className={Styles.label}>Area total:</span>
            <NumberFormat
              thousandSeparator=","
              suffix="m²"
              value={property.totalArea.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.stat}>
            <span className={Styles.label}>Precio por m²:</span>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              suffix="/m²"
              value={property.pricePerM2.toFixed(2)}
              displayType="text"
            />
          </div>
          <div className={Styles.stat}>
            <span className={Styles.label}>
              Precio por m² cuadrado con adicionales:
            </span>
            <NumberFormat
              thousandSeparator=","
              prefix="$"
              suffix="/m²"
              value={property.pricePerM2WithAdditionalAreas.toFixed(2)}
              displayType="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Prices.propTypes = {
  property: PropTypes.shape({
    basePrice: PropTypes.number,
    additionalAreasPrice: PropTypes.number,
    totalArea: PropTypes.number,
    pricePerM2: PropTypes.number,
    pricePerM2WithAdditionalAreas: PropTypes.number,
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        measure: PropTypes.number,
        unit: PropTypes.oneOf(['MT2', 'UNT']),
      }),
    ),
    additionalAreas: PropTypes.arrayOf(
      PropTypes.shape({
        nomenclature: PropTypes.string,
        price: PropTypes.number,
        measure: PropTypes.number,
        unit: PropTypes.oneOf(['MT2', 'UNT']),
      }),
    ),
  }),
};

export default Prices;
