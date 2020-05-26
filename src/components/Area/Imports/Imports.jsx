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
    try {
      let name = 'Plantilla_Esquema.xlsx';
      const response = await services.getSchemaTemplate(towerId);
      const towerRequest = await services.getTowerInfo(towerId);
      if (towerRequest.data.name && towerRequest.data.project) {
        const { data } = towerRequest;
        name = `Plantilla ${data.name} del proyecto ${data.project}.xlsx`;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
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
