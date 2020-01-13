import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../../UI/Button/Button';
import PropertyCells from './PropertyCells';
import PropertyDetails from './PropertyDetails';
import ClientsServices from '../../../../services/client/ClientsServices';

const Info = ({ client, handleClose }) => {
  const services = new ClientsServices();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    setProperty(null);
  }, [client]);

  const selectProperty = (id) => {
    services.getPropertyInfo(id).then((response) => {
      setProperty(response.data);
    });
  };

  return (
    <Dialog open={client !== null} fullWidth maxWidth="lg">
      {client && (
        <Fragment>
          <DialogTitle>{client.name}</DialogTitle>
          <DialogContent>
            <PropertyCells
              properties={client.properties}
              selectProperty={selectProperty}
            />
            <PropertyDetails property={property} />
          </DialogContent>
          <DialogActions>
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
  handleClose: PropTypes.func,
};

export default Info;
