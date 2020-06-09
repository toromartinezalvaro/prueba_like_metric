import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/imports';
import UploadDialog, { actions } from './Upload';

const services = new ImportServices();

function Imports({ disabled, openDialogHandler, updateInformation }) {
  const { towerId } = useParams();

  const downloadTemplate = async () => {
    try {
      let name = 'Plantilla_Esquema.xlsx';
      const response = await services.getNomenclatureTemplate(towerId);
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
            disabled={disabled}
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
            disabled={disabled}
          >
            Cargar plantilla
          </Button>
        </Grid>
      </Grid>
      <UploadDialog updateInformation={updateInformation} />
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  openDialogHandler: actions.openDialog,
};

Imports.propTypes = {
  updateInformation: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Imports);
