import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/groupsImport';
import UploadDialog, { actions } from './Upload';

const services = new ImportServices();

function Imports({ openDialogHandler, company }) {
  const [companyId, setCompanyId] = useState('');
  useEffect(() => {
    setCompanyId(company);
  }, [company]);
  const downloadTemplate = async () => {
    try {
      const name = 'Plantilla_Grupos.xlsx';
      const response = await services.getGroupTemplate(companyId);
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
  company: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Imports);
