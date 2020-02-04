import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddToTower from './AddToTower';
import { DashboardRoutes } from '../../../../routes/local/routes';
import ContainerContext from '../../../../containers/Client/context';

const ClientActions = ({ client }) => {
  const { towerId, isOpen, setIsOpen, setSelectedClient } = useContext(
    ContainerContext,
  );

  return (
    <Grid container direction="column" spacing={1}>
      {client.id !== null && (
        <Fragment>
          <Grid item>
            <Button
              color="primary"
              onClick={() => {
                setIsOpen({ ...isOpen, detail: true });
                setSelectedClient(client);
              }}
              fullWidth
            >
              Ver detalles
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <AddToTower />
              </Grid>
              <Grid item xs={6}>
                <Link
                  to={`${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`}
                >
                  <Button color="primary" variant="outlined" fullWidth>
                    Ir a sala de ventas
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

ClientActions.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    identityDocument: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

export default ClientActions;
