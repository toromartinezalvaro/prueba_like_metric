import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setClose } from './action';

const CantDeleteDialog = ({ open, onSetClose, field }) => {
  const MESSAGE_FOR_ITEM_HEADER =
    'Ha ocurrido un error al tratar de eliminar el item';
  const MESSAGE_FOR_GROUP_HEADER =
    'Ha ocurrido un error al tratar de eliminar el groupo';
  const MESSAGE_FOR_ITEM = `El item que intentas borrar está asignado a un contrato.
     Te recomendamos edites el contrato y retires la asignación del item, una vez hecho esto
     podrás borrar el item.`;
  const MESSAGE_FOR_GROUP = `El grupo que intentas borrar está asignado a un contrato.
     Te recomendamos edites el contrato y retires la asignación del grupo, una vez hecho esto
     podrás borrar el grupo.`;
  const handleClose = () => {
    onSetClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {field === 'item'
            ? MESSAGE_FOR_ITEM_HEADER
            : MESSAGE_FOR_GROUP_HEADER}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {field === 'item' ? MESSAGE_FOR_ITEM : MESSAGE_FOR_GROUP}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CantDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSetClose: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  open: state.groups.groupCantDelete.open,
  field: state.groups.groupCantDelete.field,
});

const mapDispatchToProps = {
  onSetClose: setClose,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CantDeleteDialog);
