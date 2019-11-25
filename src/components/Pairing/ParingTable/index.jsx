import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../UI2/Button';

const PairingTable = ({ properties, areas }) => {
  const getMaxAreas = () => {
    return properties.reduce((current, next) => {
      return next.additionalAreas.length > current
        ? next.additionalAreas.length
        : current;
    }, 0);
  };

  const [maxAreasLength, setMaxAreasLength] = useState(getMaxAreas());

  return (
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
          <TableCell>
            <Button
              onClick={() => {
                setMaxAreasLength(maxAreasLength + 1);
              }}
            >
              Agregar
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map((property, propertyIndex) => {
          return (
            <TableRow key={`property-${propertyIndex}`}>
              <TableCell>{property.name}</TableCell>
              <TableCell>
                {property.additionalAreas.length === 0 ? 'Libre' : 'Apareado'}
              </TableCell>
              {Array(maxAreasLength)
                .fill(null)
                .map((_, columnIndex) => {
                  return (
                    <TableCell key={`area-${propertyIndex}-${columnIndex}`}>
                      <Select
                        value={
                          property.additionalAreas.length > columnIndex
                            ? property.additionalAreas[columnIndex].id
                            : ''
                        }
                        displayEmpty
                      >
                        <MenuItem value="">Sin area</MenuItem>
                        {areas.map((area, areaGroupIndex) => {
                          return [
                            <ListSubheader
                              key={`area-${propertyIndex}-${columnIndex}-${areaGroupIndex}`}
                            >
                              {area.name}
                            </ListSubheader>,
                            area.additionalAreas.map(
                              (additionalArea, additionalAreaIndex) => {
                                return (
                                  <MenuItem
                                    value={additionalArea.id}
                                    key={`area-${propertyIndex}-${columnIndex}-${areaGroupIndex}-${additionalAreaIndex}`}
                                  >
                                    {additionalArea.nomenclature
                                      ? additionalArea.nomenclature
                                      : `${area.name}(Sin nomenclatura)`}
                                  </MenuItem>
                                );
                              },
                            ),
                          ];
                        })}
                      </Select>
                    </TableCell>
                  );
                })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
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
};

export default PairingTable;
