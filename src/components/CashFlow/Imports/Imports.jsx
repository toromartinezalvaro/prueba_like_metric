/*
 * Created Date: Friday June 19th 2020
 * Author: Caraham
 * -----
 * Last Modified: Friday, 19th June 2020 9:31:53 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImportServices from '../../../services/imports';

const services = new ImportServices();

function Imports({ data, disabled }) {
  const { towerId } = useParams();

  const downloadTemplate = async () => {
    try {
      let name = 'Plantilla_Esquema.xlsx';
      const response = await services.getCashFlowTemplate(towerId);
      const towerRequest = await services.getTowerInfo(towerId);
      if (towerRequest.data.name && towerRequest.data.project) {
        const { data: dataTower } = towerRequest;
        name = `Plantilla ${dataTower.name} del proyecto ${dataTower.project}.xlsx`;
      }
      console.log(response.data);
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
      </Grid>
    </>
  );
}

Imports.propTypes = {
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Imports;
