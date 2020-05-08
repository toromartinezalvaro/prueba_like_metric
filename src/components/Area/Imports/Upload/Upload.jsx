import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImportServices from '../../../../services/imports';

const services = new ImportServices();

export default function Dialog() {
  const { towerId } = useParams();
  const [file, setFile] = useState(null);

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    services.postSchema(towerId, formData);
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <MuiDialog >
      <DialogTitle>Cargar plantilla</DialogTitle>
      <DialogContent>
        <DialogContentText>Agregue la plantilla ya completa.</DialogContentText>
        <input
          name="file"
          accept="xlsx/*"
          style={{ display: 'none' }}
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
        <Button size="small" color="primary">
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
