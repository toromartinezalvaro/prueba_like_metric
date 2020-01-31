import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const defaultClient = {
  id: null,
  identityDocument: '',
  name: '',
  email: '',
  phoneNumber: '',
};

const FormDialog = ({ client, onCloseHandler }) => {
  const [innerClient, setInnerClient] = useState(defaultClient);

  useEffect(() => {
    if (client) {
      if (client.id) {
        setInnerClient(client);
      } else {
        const attribute = Number.isNaN(Number(client.identityDocument))
          ? 'name'
          : 'identityDocument';
        setInnerClient({
          ...defaultClient,
          [attribute]: client.identityDocument,
        });
      }
    } else {
      setInnerClient(defaultClient);
    }
  }, [client]);

  return (
    <Dialog open={client !== null}>
      <DialogTitle>Cliente</DialogTitle>
      <DialogContent>
        <DialogContentText>Informacion del cliente</DialogContentText>
        <TextField
          label="Documento de identidad"
          value={innerClient.identityDocument}
          disabled={innerClient.id !== null}
        />
        <TextField label="Nombre" value={innerClient.name} />
        <TextField label="Correo" value={innerClient.email} />
        <TextField label="Numero de telefono" value={innerClient.phoneNumber} />

        {innerClient.id !== null && (
          <Button variant="contained" color="primary" fullWidth>
            Agregar a la torre
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCloseHandler}>
          Cerrar
        </Button>
        <Button color="primary" autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    identityDocument: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  onCloseHandler: PropTypes.func.isRequired,
};

export default FormDialog;
