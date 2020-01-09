import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DashboardRoutes } from '../../../routes/local/routes';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Button2 from '../../UI2/Button';
import Styles from './ClientList.module.scss';
import InfoDialog from './Info';

const ClientList = ({ towerId, openSearchAndEdit, clients }) => {
  const [shownClient, setShownClient] = useState(null);

  const getData = () => {
    return clients.map((client, index) => {
      return [
        <TableRow hover key={`row-${index}`}>
          <TableCell>{client.identityDocument}</TableCell>
          <TableCell>{client.name}</TableCell>
          <TableCell>{client.email}</TableCell>
          <TableCell>{client.phoneNumber}</TableCell>
          <TableCell>
            <Button2
              onClick={() => {
                setShownClient(client);
              }}
            >
              Detalles
            </Button2>
          </TableCell>
          <TableCell>
            <Link
              key={`link-${index}`}
              to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`}
            >
              <Button2>Sala de ventas</Button2>
            </Link>
          </TableCell>
        </TableRow>,
      ];
    });
  };

  const columns = ['Cedula', 'Nombre', 'Correo', 'Celular', '', ''];

  return (
    <div>
      <Card>
        <CardHeader>
          <div className={Styles.HeaderContainer}>
            <div></div>
            <div className={Styles.Search} onClick={openSearchAndEdit}>
              <span>Buscar y editar</span>
            </div>
            <Link
              to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/none`}
            >
              <Button className={Styles.ButtonGo}>
                Ir sin seleccionar usuario
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={`headerCell-${index}`}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{getData()}</TableBody>
          </Table>
        </CardBody>
      </Card>
      <InfoDialog
        client={shownClient}
        handleClose={() => {
          setShownClient(null);
        }}
      />
    </div>
  );
};

ClientList.propTypes = {
  towerId: PropTypes.string.isRequired,
  openSearchAndEdit: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  ).isRequired,
};

export default ClientList;
