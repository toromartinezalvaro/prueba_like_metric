import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImportServices from '../../../../services/imports';
import { closeDialog } from './actions';

const services = new ImportServices();

function Dialog({ open, onCloseHandler }) {
  const { enqueueSnackbar } = useSnackbar();
  const { towerId } = useParams();
  const [file, setFile] = useState(null);

  const onFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await services.postSchema(towerId, formData);
      enqueueSnackbar('Plantilla cargada correctamente', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <MuiDialog open={open}>
      <DialogTitle>Cargar plantilla</DialogTitle>
      <DialogContent>
        <DialogContentText>Agregue la plantilla ya completa.</DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button size="small" color="primary" onClick={onCloseHandler}>
          Cancelar
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={onFileUpload}
          disabled={file === null}
        >
          Cargar
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.areas.open,
});

const mapDispatchToProps = {
  onCloseHandler: closeDialog,
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);
