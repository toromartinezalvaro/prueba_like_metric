import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Styles from './PropertyCells.module.scss';

const PropertyCells = ({ properties, selectProperty }) => {
  return (
    <Fragment>
      <div className={Styles.container}>
        <div>Propiedades: </div>
        {properties.map((property, index) => {
          return (
            <Chip
              label={property.name}
              key={`propertyCell-${index}`}
              onClick={() => {
                selectProperty(property.id);
              }}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

PropertyCells.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  selectProperty: PropTypes.func,
};

export default PropertyCells;
