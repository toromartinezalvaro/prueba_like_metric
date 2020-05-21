import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AreaCell from './AreaCell';
import styles from './propertyRow.module.scss';

const PropertyRow = ({
  property,
  areas,
  maxCols,
  addAreaHandler,
  removeAreaHandler,
  propertyStatus,
}) => {
  const sortedAreas = _.sortBy(property.additionalAreas, [
    'areaType.name',
    'nomenclature',
  ]);

  return (
    <TableRow>
      <TableCell>
        <div className={styles.container}>
          <div
            className={
              property.status === 'AVAILABLE'
                ? styles.GreenHelper
                : property.status === 'SOLD'
                ? styles.BlueHelper
                : styles.YellowHelpe
            }
          />
        </div>
      </TableCell>
      <TableCell>{property.name}</TableCell>
      <TableCell>
        {property.additionalAreas.length === 0 ? 'Libre' : 'Apareado'}
      </TableCell>
      {Array(maxCols)
        .fill(null)
        .map((_, index) => {
          const area =
            property.additionalAreas.length > index ? sortedAreas[index] : null;
          return (
            <AreaCell
              key={`${property.id}-${index}`}
              areas={areas}
              area={area}
              status={propertyStatus}
              addAreaHandler={addAreaHandler}
              removeAreaHandler={removeAreaHandler}
            />
          );
        })}
    </TableRow>
  );
};

PropertyRow.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    floor: PropTypes.number,
    location: PropTypes.number,
    additionalAreas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        areaType: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      additionalAreas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          nomenclature: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  maxCols: PropTypes.number.isRequired,
  addAreaHandler: PropTypes.func.isRequired,
  removeAreaHandler: PropTypes.func.isRequired,
};

export default PropertyRow;
