import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormDialog = ({ client }) => {
  return (
    <Dialog open={client !== null}>
      <DialogTitle>Cliente</DialogTitle>
      <DialogContent>
        <DialogContentText>Informacion del cliente</DialogContentText>
        <form>
          <TextField label="Nombre" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cerrar</Button>
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
};

export default FormDialog;
