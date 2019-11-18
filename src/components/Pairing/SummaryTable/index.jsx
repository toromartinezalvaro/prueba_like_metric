import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const SummaryTable = ({ properties }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Cantidad</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Apareados</TableCell>
          <TableCell>
            {
              properties.filter((property) => {
                return property.areas.length > 0;
              }).length
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Disponibles</TableCell>
          <TableCell>
            {
              properties.filter((property) => {
                return property.areas.length === 0;
              }).length
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{properties.length}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

SummaryTable.propTypes = {
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
};

export default SummaryTable;
