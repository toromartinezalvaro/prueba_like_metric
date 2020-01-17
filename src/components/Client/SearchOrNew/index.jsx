import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Styles from './SearchOrNew.module.scss';
import SearchForm from './SearchForm';

const SAVE = 'save';
const ADD = 'add';

const SearchOrNewClient = ({
  open,
  handleClose,
  clientInfo,
  searchNumber,
  saveHandler,
  updateHandler,
  addHandler,
  action,
  goToSalesRoom,
  addClientToTower,
  clientAdded,
}) => {
  const [client, setClient] = useState(clientInfo);
  const [isEditing, setEdition] = useState(false);
  const [valid, setValid] = useState(true);

  const validateEmail = (email) => {
    return /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
      email,
    );
  };

  useEffect(() => {
    setClient(clientInfo);
    setValid(client.email === undefined || validateEmail(clientInfo.email));
  }, [clientInfo]);

  const handleChange = (name) => (event) => {
    setValid(client.email === undefined || validateEmail(client.email));
    setClient({ ...client, [name]: event.target.value });
  };

  const searchCurrentNumber = () => {
    setEdition(true);
    searchNumber(client.identityDocument);
  };

  const update = () => {
    setEdition(false);
    updateHandler(client);
  };

  const save = (isGoingToSalesRoom = false) => {
    setEdition(false);
    saveHandler(client, isGoingToSalesRoom);
  };

  const add = () => {
    setEdition(false);
    addHandler(client);
  };

  const close = () => {
    setEdition(false);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} scroll="body" maxWidth="lg">
        <DialogTitle id="scroll-dialog-title">Buscar y editar</DialogTitle>
        <DialogContent>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              {isEditing &&
                action === ADD &&
                client.towers &&
                client.towers.length === 0 && (
                  <div className={Styles.addToTowerContainer}>
                    {clientAdded ? (
                      <span>El cliente fue agregado a la torre</span>
                    ) : (
                      <span>El cliente no esta asociando a la torre</span>
                    )}
                    <Button
                      onClick={() => {
                        addClientToTower(client.identityDocument);
                      }}
                      color="primary"
                      disabled={clientAdded}
                    >
                      Agregar a la torre
                    </Button>
                  </div>
                )}

              <SearchForm
                handleChange={handleChange}
                isEditing={isEditing}
                client={client}
              />
            </CardBody>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancelar
          </Button>
          {!isEditing && (
            <Button onClick={searchCurrentNumber} color="primary">
              Buscar
            </Button>
          )}
          {valid && (
            <Fragment>
              {isEditing && action === ADD && !clientInfo.hasCompanyAssociated && (
                <Button onClick={add} color="primary">
                  Agregar a mi compañía
                </Button>
              )}
              {isEditing && action === SAVE && (
                <Button onClick={save} color="primary">
                  Guardar
                </Button>
              )}
              {isEditing && action === SAVE && (
                <Button onClick={() => save(true)} color="primary">
                  Guardar e ir a Sala de ventas
                </Button>
              )}
              {isEditing && action === ADD && (
                <Button onClick={update} color="primary">
                  Actualizar
                </Button>
              )}
              {isEditing && (
                <Button
                  onClick={() => goToSalesRoom(clientInfo)}
                  color="primary"
                >
                  Ir a sala de ventas
                </Button>
              )}
            </Fragment>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

SearchOrNewClient.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  clientInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    hasCompanyAssociated: PropTypes.bool,
  }).isRequired,
  searchNumber: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  goToSalesRoom: PropTypes.func.isRequired,
  addClientToTower: PropTypes.func.isRequired,
  clientAdded: PropTypes.bool.isRequired,
};

export default SearchOrNewClient;
