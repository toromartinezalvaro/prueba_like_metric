import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImportServices from '../../../../services/groupsImport';
import {
  closeDialog,
  changeFile,
  startApiFetch,
  stopApiFetch,
} from './actions';
import Loader from '../../../UI2/Loader';

const services = new ImportServices();

function Dialog({
  open,
  file,
  loading,
  onCloseHandler,
  onSelectFile,
  onApiFetchStart,
  onApiFetchEnd,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const onFileUpload = async () => {
    onApiFetchStart();
    try {
      const formData = new FormData();
      formData.append('file', file);
      await services.postSchema(formData);
      onCloseHandler();
      onSelectFile(null);
      enqueueSnackbar('Plantilla cargada correctamente', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
    onApiFetchEnd();
  };

  const onChangeHandler = (event) => {
    onSelectFile(event.target.files[0]);
  };

  const closeHandler = () => {
    onCloseHandler();
    onSelectFile(null);
  };

  return (
    <MuiDialog open={open}>
      <DialogTitle>Cargar plantilla</DialogTitle>
      <DialogContent>
        <DialogContentText>Agregue la plantilla ya completa.</DialogContentText>
        <Loader isLoading={loading}>
          <input
            name="file"
            accept="xlsx/*"
            hidden
            id="raised-button-file"
            type="file"
            onChange={onChangeHandler}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              disableElevation
              fullWidth
            >
              {file ? file.name : 'Seleccionar plantilla'}
            </Button>
          </label>
        </Loader>
      </DialogContent>
      <DialogActions>
        <Button size="small" color="primary" onClick={closeHandler}>
          Cancelar
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={onFileUpload}
          disabled={file === null || loading}
        >
          Cargar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.areas.open,
  file: state.areas.file,
  loading: state.areas.loading,
});

const mapDispatchToProps = {
  onCloseHandler: closeDialog,
  onSelectFile: changeFile,
  onApiFetchStart: startApiFetch,
  onApiFetchEnd: stopApiFetch,
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  file: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  onApiFetchStart: PropTypes.func.isRequired,
  onApiFetchEnd: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);
