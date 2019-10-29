import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DashboardRoutes } from '../../../routes/local/routes';
import Card, { CardHeader, CardBody, CardFooter } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Button2 from '../../UI2/Button';
import Table from '../../UI/Table/Table';
import Styles from './ClientList.module.scss';

const ClientList = ({ towerId, openSearchAndEdit, clients }) => {
  const getData = () => {
    return clients.map((client, index) => {
      return [
        client.identityDocument,
        client.name,
        client.email,
        client.phoneNumber,
        <Link
          key={`link-${index}`}
          to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.identityDocument}`}
        >
          <Button2>Sala de ventas</Button2>
        </Link>,
      ];
    });
  };

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
          <div>
            <Table
              intersect="clients"
              headers={['cedula', 'nombre', 'correo', 'celular']}
              columns={[]}
              data={getData()}
            ></Table>
          </div>
        </CardBody>
      </Card>
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
