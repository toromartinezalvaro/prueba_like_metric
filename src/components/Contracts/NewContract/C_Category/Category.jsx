import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from './Category.module.scss';

const Category = ({ handleCloseCategory }) => {
  return (
    <div container className={styles.gridContainer}>
      <div className={styles.categoryCreator}>
        <TextField
          fullWidth
          required
          className={styles.textField}
          label="Nombre de Categoría"
          margin="normal"
          variant="outlined"
        />
      </div>

      <div className={styles.gridSubContainer}>
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
          handleCloseCategory={handleCloseCategory}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Category;
