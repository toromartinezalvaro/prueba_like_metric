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
}) => {
  const [client, setClient] = useState(clientInfo);
  const [isEditing, setEdition] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setClient(clientInfo);
  }, [clientInfo]);

  const handleChange = (name) => (event) => {
    setValid(
      client.email === undefined ||
        /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
          client.email,
        ),
    );
    setClient({ ...client, [name]: event.target.value });
  };

  const searchCurrentNumber = () => {
    setEdition(true);
    searchNumber(client.identityDocument);
  };

  const save = () => {
    setEdition(false);
    saveHandler(client);
  };

  const update = () => {
    setEdition(false);
    updateHandler(client);
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
              {isEditing && action === ADD && (
                <Button onClick={add} color="primary">
                  Agregar a mi compañía
                </Button>
              )}
              {isEditing && action === SAVE && (
                <Button onClick={save} color="primary">
                  Guardar
                </Button>
              )}
              {isEditing && action === ADD && (
                <Button onClick={update} color="primary">
                  Actualizar
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
  }).isRequired,
  searchNumber: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default SearchOrNewClient;
