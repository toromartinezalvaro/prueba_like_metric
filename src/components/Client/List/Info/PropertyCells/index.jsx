import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../UI/Button/Button';
import Styles from './PropertyCells.module.scss';

const PropertyCells = ({ properties, selectProperty, selectedId }) => {
  return (
    <Fragment>
      <div className={Styles.container}>
        <div>Propiedades: </div>
        {properties.map((property, index) => {
          return (
            <Button
              className={selectedId === property.id && Styles.selected}
              key={`propertyCell-${index}`}
              onClick={() => {
                selectProperty(property.id);
              }}
            >
              {property.name}
            </Button>
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
