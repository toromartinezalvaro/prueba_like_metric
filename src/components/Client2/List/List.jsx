import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
import Loader from '../../UI2/Loader';
import Row from './Row';
import Styles from './List.module.scss';

const List = ({ clients, isLoading }) => {
  const columnHeaders = [
    { text: 'Comprador', align: 'center' },
    { text: 'Identificacion', align: 'right' },
    { text: 'Nombre', align: 'inherit' },
    { text: 'Correo', align: 'inherit' },
    { text: 'Telefono', align: 'right' },
    { text: '', align: 'center' },
    { text: '', align: 'center' },
  ];

  return (
    <Card classes={{ root: Styles.card }}>
      <CardHeader title="Lista de clientes" subheader="de la torre" />
      <CardContent>
        <Loader isLoading={isLoading}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnHeaders.map((columnHeader, index) => (
                    <TableCell
                      key={`columnHeader-${index}`}
                      align={columnHeader.align}
                    >
                      {columnHeader.text}
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
        </Loader>
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
  isLoading: PropTypes.bool,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      identityDocument: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      properties: PropTypes.array,
    }),
  ),
};

List.defaultProps = {
  isLoading: false,
  clients: [],
};

export default List;
