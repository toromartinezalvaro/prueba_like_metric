import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Row from './Row';
import Styles from './List.module.scss';

const List = ({ clients }) => {
  const columnHeaders = [
    'Comprador',
    'Identificacion',
    'Nombre',
    'Correo',
    'Telefono',
    '',
    '',
  ];

  return (
    <Card classes={{ root: Styles.card }}>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columnHeaders.map((columnHeader, index) => (
                  <TableCell key={`columnHeader-${index}`}>
                    {columnHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <Row key={client.id} client={client} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Ir a sala de ventas sin seleccionar cliente
        </Button>
      </CardActions>
    </Card>
  );
};

List.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      identityDocument: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  ),
};

export default List;
