import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingContainer from '../../../UI2/Loader/Loader';

const Dialog = ({ loading, open, request, acceptHandler, rejectHandler }) => {
  const { name, nomenclature, property } = request;
  return (
    <MuiDialog open={open}>
      <DialogTitle>Solicitud pendiente para {nomenclature}</DialogTitle>
      <DialogContent>
        <LoadingContainer isLoading={loading}>
          <DialogContentText>
            ¿Qué desea hacer para el desistimiento del area {name} -{' '}
            {nomenclature} de la propiedad {property}?
          </DialogContentText>
        </LoadingContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            acceptHandler(request.id);
          }}
          size="small"
          color="primary"
        >
          Aceptar
        </Button>
        <Button
          onClick={() => {
            rejectHandler(request.id);
          }}
          size="small"
          color="secondary"
        >
          Rechazar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  loading: PropTypes.bool,
  open: PropTypes.bool,
  request: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    nomenclature: PropTypes.string,
    property: PropTypes.string,
  }),
  acceptHandler: PropTypes.func.isRequired,
  rejectHandler: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  loading: false,
  open: false,
  request: {
    id: 0,
    name: '',
    nomenclature: '',
    property: '',
  },
};

export default Dialog;
