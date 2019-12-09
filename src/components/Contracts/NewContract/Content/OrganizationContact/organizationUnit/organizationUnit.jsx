/*
 * Created on Tue Nov 07 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { useState, Fragment, useEffect } from 'react';
import { TextField, Button, Typography, Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import styles from './organizationUnit.module.scss';

const OrganizationUnit = ({
  handleOpenOrClose,
  newOrganization,
  updateOrganization,
  informationToEdit,
}) => {
  const [textOfOrganization, setTextOfOrganization] = useState('');
  const changeTextOfOrganization = (e) => {
    setTextOfOrganization(e.target.value);
  };
  const sendTextOfCategory = () => {
    if (informationToEdit) {
      updateOrganization({
        id: informationToEdit.id,
        name: textOfOrganization,
        contractId: informationToEdit.contractId,
      });
      handleOpenOrClose();
    } else {
      newOrganization({ name: textOfOrganization });
      handleOpenOrClose();
    }
  };

  useEffect(() => {
    if (informationToEdit) {
      setTextOfOrganization(informationToEdit.name);
    }
  }, []);

  return (
    <Fragment>
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>
          {informationToEdit
            ? 'Editar Unidad Organizacional'
            : 'Nueva Unidad Organizacional'}
        </div>
      </Typography>
      <div container className={styles.gridContainer}>
        <div className={styles.creator}>
          <TextField
            fullWidth
            required
            className={styles.textField}
            label="Nombre de la Unidad Organizacional"
            margin="normal"
            variant="outlined"
            value={textOfOrganization}
            onChange={changeTextOfOrganization}
          />
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          startIcon={<AddIcon />}
          onClick={sendTextOfCategory}
        >
          {informationToEdit ? 'Editar' : 'Crear'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={`${styles.button} ${styles.buttonMargin}`}
          startIcon={<Icon className="fas fa-ban" />}
          onClick={handleOpenOrClose}
        >
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};

OrganizationUnit.propTypes = {
  informationToEdit: PropTypes.object,
  editable: PropTypes.bool,
};

export default OrganizationUnit;
