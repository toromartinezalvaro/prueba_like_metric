/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styles from './Custom.module.scss';


const Custom = () => {
  return (
    <Grid container
      className={styles.gridContainer}
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          className={styles.textField}
          label="Unidad De Negocio"
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <Grid container direction="row" alignItems="center" className={styles.leftInputs} justify="center">
          <TextField
            fullWidth
            select
            className={styles.leftInputs}
            label="Unidad organizacional"
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Grid >
  );
}

export default Custom;