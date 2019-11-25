import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AreaCell from './AreaCell';

const PropertyRow = ({ property, areas, maxCols }) => {
  return (
    <TableRow>
      <TableCell>{property.name}</TableCell>
      <TableCell>
        {property.additionalAreas.length === 0 ? 'Libre' : 'Apareado'}
      </TableCell>
      {Array(maxCols)
        .fill(null)
        .map((_, index) => {
          return <AreaCell key={`${property.id}-${index}`} areas={areas} />;
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
};

export default PropertyRow;
