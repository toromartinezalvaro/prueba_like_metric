import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from 'react-select';
import PropTypes from 'prop-types';

import styles from './GeneralInfo.module.scss';
import Category from '../NewContract/C_Category/Category';
import BusinessPatner from '../NewContract/C_BusinessPatner/BusinessPatner';

const GeneralInfo = ({
  handleOpenCategory,
  handleOpenBusinessPatner,
  searchCategory,
  categories
}) => {
  const loadOptions = () => {
    return categories.map(option => ({
      value: option.name,
      label: option.name
    }));
  }
  return (
    <Grid
      container
      className={styles.gridContainer}
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      {console.log(loadOptions())}
      <Grid item xs={6} md={6}>
        <TextField
          required
          fullWidth
          className={styles.textField}
          label="Titulo De Contrato"
          margin="normal"
          variant="outlined"
        />
        <Grid
          container
          direction="row"
          alignItems="center"
          className={styles.selects}
          spacing={2}
          justify="center"
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              select
              className={styles.textField}
              label="Socio de negocios"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={handleOpenBusinessPatner}
              className={styles.fab}
            >
              <AddIcon />
            </Fab>
            <Fab
              color="secondary"
              mx={2}
              size="small"
              aria-label="edit"
              className={styles.fab}
            >
              <EditIcon />
            </Fab>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          className={styles.selects}
          alignItems="center"
          spacing={2}
          justify="center"
        >
          <Grid item xs={6}>
            {/*categoryWard*/}
            <Select
              fullWidth
              className={styles.textField}
              inputId="react-select-single"
              TextFieldProps={{
                label: 'Categoria',
                InputLabelProps: {
                  htmlFor: 'react-select-single',
                  shrink: true,
                },
              }}
              label="Categoria"
              margin="normal"
              options={loadOptions}
              components = {Option}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              className={styles.fab}
              onClick={handleOpenCategory}
            >
              <AddIcon />
            </Fab>
            <Fab
              color="secondary"
              mx={2}
              size="small"
              aria-label="edit"
              className={styles.fab}
            >
              <EditIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6}>
        <TextField
          fullWidth
          select
          className={styles.textField}
          label="Estado"
          margin="normal"
          variant="outlined"
        />
        <TextField
          className={styles.leftInputs}
          label="Numero de contrato"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          select
          className={styles.textField}
          label="Contrato principal"
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid xs={12} md={12}>
        <TextField
          multiline
          fullWidth
          rows="6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

GeneralInfo.propTypes = {
  categories: PropTypes.array,
};

export default GeneralInfo;
