import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../../UI/Button/Button';
import PropertyCells from './PropertyCells';
import PropertyDetails from './PropertyDetails';
import ClientsServices from '../../../../services/client/ClientsServices';
import { DashboardRoutes } from '../../../../routes/local/routes';

const Info = ({ client, towerId, handleClose }) => {
  const services = new ClientsServices();

  const [property, setProperty] = useState(null);

  const selectProperty = (id) => {
    services.getPropertyInfo(id).then((response) => {
      const property = response.data;
      property.id = id;
      setProperty(property);
    });
  };

  useEffect(() => {
    if (client && client.properties.length > 0) {
      selectProperty(client.properties[0].id);
    } else {
      selectProperty(null);
    }
  }, [client]);

  return (
    <Dialog open={client !== null} fullWidth maxWidth="lg">
      {client && (
        <Fragment>
          <DialogTitle>{client.name}</DialogTitle>
          <DialogContent>
            {client.properties.length > 0 ? (
              <Fragment>
                <PropertyCells
                  selectedId={property ? property.id : null}
                  properties={client.properties}
                  selectProperty={selectProperty}
                />
                <PropertyDetails property={property} />
              </Fragment>
            ) : (
              <span>Actualmente no ha comprado ningún apartamento</span>
            )}
          </DialogContent>
          <DialogActions>
            <Link
              to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`}
            >
              <Button>Ir a Sala de ventas</Button>
            </Link>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

Info.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        floor: PropTypes.number,
        location: PropTypes.number,
      }),
    ),
  }),
  towerId: PropTypes.string,
  handleClose: PropTypes.func,
};

export default Info;
