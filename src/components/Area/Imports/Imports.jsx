import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/imports';
import UploadDialog, { actions } from './Upload';

const services = new ImportServices();

function Imports({ openDialogHandler }) {
  const { towerId } = useParams();

  const downloadTemplate = async () => {
    const response = await services.getSchemaTemplate(towerId);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Plantilla_Esquema.xlsx');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
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
          <Button
            onClick={openDialogHandler}
            color="primary"
            variant="contained"
            disableElevation
          >
            Cargar plantilla
          </Button>
        </Grid>
      </Grid>
      <UploadDialog />
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  openDialogHandler: actions.openDialog,
};

Imports.propTypes = {
  openDialogHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Imports);
