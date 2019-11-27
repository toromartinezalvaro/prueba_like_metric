import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropertyRow from './PropertyRow';
import Button from '../../UI2/Button';
import Styles from './PairingTable.module.scss';

const PairingTable = ({
  properties,
  areas,
  addAreaHandler,
  removeAreaHandler,
}) => {
  const getMaxAreas = () => {
    return properties.reduce((current, next) => {
      return next.additionalAreas.length > current
        ? next.additionalAreas.length
        : current;
    }, 0);
  };

  const [maxAreasLength, setMaxAreasLength] = useState(getMaxAreas());

  const addArea = (propertyId) => {
    return (areaId) => {
      addAreaHandler(propertyId, areaId);
    };
  };

  return (
    <div className={Styles.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Nomenclatura</TableCell>
            <TableCell>Estado</TableCell>
            {Array(maxAreasLength)
              .fill(null)
              .map((_, headerIndex) => {
                return (
                  <TableCell key={`header-${headerIndex}`}>
                    Adicional {headerIndex + 1}
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => {
            return (
              <PropertyRow
                key={property.id}
                property={property}
                maxCols={maxAreasLength}
                areas={areas}
                addAreaHandler={addArea(property.id)}
                removeAreaHandler={removeAreaHandler}
              />
            );
          })}
        </TableBody>
      </Table>
      <Button
        onClick={() => {
          setMaxAreasLength(maxAreasLength + 1);
        }}
      >
        Agregar
      </Button>
    </div>
  );
};

PairingTable.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      areas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          areaType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  ).isRequired,
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  addAreaHandler: PropTypes.func.isRequired,
  removeAreaHandler: PropTypes.func.isRequired,
};

export default PairingTable;
