import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import DialogContext from '../../Dialog/context';
import PercentageInput from './PercentageInput';
import Styles from './PropertyInfo.module.scss';

const PropertyInfo = ({ quotationData }) => {
  const {
    quotation: {
      property,
      propertyPrice,
      initialFeePercentage,
      reservePercentage,
      periods,
    },
    initialFeeHandler,
    reserveHandler,
  } = useContext(DialogContext);

  const initialFee = useMemo(() => propertyPrice * initialFeePercentage, [
    propertyPrice,
    initialFeePercentage,
  ]);

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <span>Apartamento + total de áreas:</span>
      </div>
      <div className={Styles.rate}>
        <span>{property.name}</span>
      </div>
      <div className={Styles.value}>
        <b>
          <NumberFormat
            value={propertyPrice.toFixed(2)}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </b>
      </div>
      <div className={Styles.title}>
        <span>Valor descuento:</span>
      </div>
      <div className={Styles.rate}>
        <span></span>
      </div>
      <div className={Styles.value}>
        <b>
          <NumberFormat
            value={Number(quotationData.discount).toFixed(2)}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </b>
      </div>
      {quotationData.additionalAreas.map((additionalArea) => {
        return (
          <>
            <div className={Styles.title}>
              <span>{additionalArea.areaType.name}</span>
            </div>
            <div className={Styles.rate}>
              <span>{additionalArea.nomenclature}</span>
            </div>
            <div className={Styles.value}>
              <b>
                <NumberFormat
                  value={additionalArea.price.toFixed(2)}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
              </b>
            </div>
          </>
        );
      })}

      <div className={Styles.title}>
        <span>Cuota inicial:</span>
      </div>
      <div className={Styles.rate}>
        <PercentageInput
          placeholder={(initialFeePercentage * 100).toFixed(2)}
          onChange={(event) => {
            initialFeeHandler(event.target.value);
          }}
        />
      </div>
      <div className={Styles.value}>
        <b>
          <NumberFormat
            value={initialFee.toFixed(2)}
            displayType="text"
            thousandSeparator
            prefix="$"
          />
        </b>
      </div>

      <div className={Styles.title}>
        <span>Separación:</span>
      </div>
      <div className={Styles.rate}>
        <PercentageInput
          placeholder={(reservePercentage * 100).toFixed(2)}
          onChange={(event) => {
            reserveHandler(event.target.value);
          }}
        />
      </div>
      <div className={Styles.value}>
        <NumberFormat
          value={(initialFee * reservePercentage).toFixed(2)}
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
            value={(
              (initialFee - initialFee * reservePercentage) /
              periods
            ).toFixed(2)}
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
          <b>
            <NumberFormat
              value={(propertyPrice * (1 - initialFeePercentage)).toFixed(2)}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </b>
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
  quotationData: PropTypes.object,
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
