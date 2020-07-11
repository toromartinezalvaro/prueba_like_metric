import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/contractFlowImports';

const services = new ImportServices();

function Imports({ towerId }) {
  const downloadTemplate = async () => {
    try {
      const name = `Flujo_de_caja_contratos.xlsx`;
      const response = await services.getContractFlowTemplate(towerId);
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
            Descargar este flujo de caja
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = {};

Imports.propTypes = {
  towerId: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Imports);
