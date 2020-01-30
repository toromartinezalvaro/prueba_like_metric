import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DashboardRoutes } from '../../../../routes/local/routes';
import ContainerContext from '../../../../containers/Client/context';

const Row = ({ client }) => {
  const { towerId } = useContext(ContainerContext);
  const { identityDocument, name, email, phoneNumber } = client;

  return (
    <TableRow>
      <TableCell align="center">
        {client.properties.length > 0 ? (
          <Typography color="primary">
            <i className="fas fa-check-circle"></i>
          </Typography>
        ) : (
          <Typography color="error">
            <i className="fas fa-times-circle"></i>
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">{identityDocument}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell align="right">{phoneNumber}</TableCell>
      <TableCell align="center">
        <Button color="primary">Detalles</Button>
      </TableCell>
      <TableCell align="center">
        <Link
          to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`}
        >
          <Button color="primary" variant="contained">
            Sala de ventas
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    identityDocument: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    properties: PropTypes.array,
  }),
};

Row.defaultProps = {
  client: {
    id: uuidv4(),
    identityDocument: '',
    name: '',
    email: '',
    phoneNumber: '',
    properties: [],
  },
};

export default Row;
