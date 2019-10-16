import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from './Category.module.scss';

const Category = () => {
  return (
      <Grid
        container
        className={styles.gridContainer}
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            className={styles.textField}
            label="Nombre de Categoría"
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid
          container
          className={styles.gridSubContainer}
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={3}
        >
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<AddIcon />}
          >
            Crear
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={`${styles.button} ${styles.buttonMargin}`}
            startIcon={<Icon className="fas fa-ban" />}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
  );
};

export default Category;
