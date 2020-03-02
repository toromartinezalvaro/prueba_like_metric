import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddToTower from './AddToTower';
import { DashboardRoutes } from '../../../../routes/local/routes';
import ContainerContext from '../../../../containers/Client/context';
import Styles from './ClientActions.module.scss';

const ClientActions = ({ client }) => {
  const history = useHistory();
  const { towerId, isOpen, setIsOpen, setSelectedClient } = useContext(
    ContainerContext,
  );

  const gotoSalesroom = () => {
    history.push(
      `${DashboardRoutes.base}${DashboardRoutes.salesRoom.value}${towerId}/${client.id}`,
    );
  };

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
              {!client.associated && (
                <Grid item xs={6}>
                  <AddToTower />
                </Grid>
              )}
              <Grid item xs={client.associated ? 12 : 6}>
                <Tooltip title="El cliente debe estar asociado a la torre">
                  <span>
                    <Button
                      disabled={!client.associated}
                      onClick={gotoSalesroom}
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Ir a sala de ventas
                    </Button>
                  </span>
                </Tooltip>
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
    associated: PropTypes.bool,
  }),
};

export default ClientActions;
