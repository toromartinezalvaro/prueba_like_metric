/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import styles from './OrganizationContact.module.scss';

const OrganizationContact = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.columnFullLeft}>
        <TextField
          fullWidth
          required
          select
          className={styles.textField}
          label="Unidad De Negocio"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          select
          className={styles.textField}
          label="Dueño Del Contrato"
          margin="normal"
          variant="outlined"
        />
      </div>
      <div className={styles.columnFullRigth} >
        <div
          container
          direction="row"
          alignItems="center"
          className={styles.leftInputs}
          spacing={4}
          justify="center"
        >
          <div className={styles.colmn}>
            <TextField
              fullWidth
              required
              select
              className={styles.selectForced}
              label="Unidad organizacional"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className={styles.colmn} className={styles.buttons}>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
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
          </div>
          <TextField
            className={styles.leftInputs}
            label="Persona Adicional De Contacto"
            margin="normal"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationContact;
