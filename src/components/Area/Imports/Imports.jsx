import React from 'react';
import { useParams } from 'react-router-dom';
import FileDownload from 'js-file-download';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/imports';
import Upload from './Upload';

const services = new ImportServices();

export default function Imports() {
  const { towerId } = useParams();

  const downloadTemplate = async () => {
    const response = await services.getSchemaTemplate(towerId);
    FileDownload(response.data, 'Plantilla de esquemas.xlsx');
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          onClick={downloadTemplate}
          color="primary"
          variant="contained"
          disableElevation
        >
          Descargar plantilla
        </Button>
      </Grid>
      <Grid item>
        <Upload />
      </Grid>
    </Grid>
  );
}
