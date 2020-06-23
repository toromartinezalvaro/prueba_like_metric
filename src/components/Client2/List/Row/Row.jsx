import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DashboardRoutes } from '../../../../routes/local/routes';
import ContainerContext from '../../../../containers/Client/context';
import ClientServices from '../../../../services/client/ClientsServices';
import { removeClient } from '../../../../containers/Client/actions';
import RemoveDialog from './RemoveDialog';

const services = new ClientServices();

const Row = ({ client }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    towerId,
    isOpen,
    setIsOpen,
    setSelectedClient,
    dispatch,
  } = useContext(ContainerContext);
  const { identityDocument, name, email, phoneNumber } = client;

  const deleteClient = async (clientId) => {
    try {
      await services.deleteClient(clientId, towerId);
      dispatch(removeClient(clientId));
      enqueueSnackbar(
        `Cliente ${
          client.allowDelete ? 'eliminado' : 'desasociado'
        } correctamente`,
        {
          variant: 'success',
        },
      );
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

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
        <Button
          onClick={() => {
            setSelectedClient(client);
            setIsOpen({ ...isOpen, detail: true });
          }}
          color="primary"
        >
          Detalles
        </Button>
      </TableCell>
      <TableCell align="center">
        <Link
          to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`}
        >
          <Button color="primary" variant="contained">
            Sala de ventas
          </Button>
        </Link>
        <RemoveDialog
          allowDelete={client.allowDelete}
          acceptHandler={() => deleteClient(client.id)}
        />
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
    allowDelete: PropTypes.bool.isRequired,
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
    allowDelete: true,
  },
};

export default Row;
