import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Prices from './Prices';
import Areas from './Areas';

const Details = ({ property }) => {
  return (
    <Fragment>
      {property && (
        <div>
          <Prices property={property} />
          <Areas property={property} />
        </div>
      )}
    </Fragment>
  );
};

Details.propTypes = {
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

export default Details;
