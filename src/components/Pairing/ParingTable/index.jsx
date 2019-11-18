import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../UI2/Button';

const PairingTable = ({ properties, areas }) => {
  const getMaxAreas = () => {
    return properties.reduce((current, next) => {
      return next.areas.length > current ? next.areas.length : current;
    }, 0);
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Nomenclatura</TableCell>
          <TableCell>Estado</TableCell>
          {Array(getMaxAreas())
            .fill(null)
            .map((_, headerIndex) => {
              return (
                <TableCell key={`header-${headerIndex}`}>
                  Adicional {headerIndex + 1}
                </TableCell>
              );
            })}
          <TableCell>
            <Button>Agregar</Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map((property, propertyIndex) => {
          return (
            <TableRow key={`property-${propertyIndex}`}>
              <TableCell>{property.name}</TableCell>
              <TableCell>
                {property.areas.length === 0 ? 'Libre' : 'Apareado'}
              </TableCell>

              {property.areas.map((propertyArea, areaIndex) => {
                return (
                  <TableCell key={`area-${propertyIndex}-${areaIndex}`}>
                    <Select value={propertyArea.areaType.id}>
                      {areas.map((area, areaIndex) => {
                        return (
                          <MenuItem value={area.id} key={`area-${areaIndex}`}>
                            {area.name}
                          </MenuItem>
                        );
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
