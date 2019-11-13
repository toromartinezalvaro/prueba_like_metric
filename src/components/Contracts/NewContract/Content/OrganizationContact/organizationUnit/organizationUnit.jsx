/*
 * Created on Tue Nov 07 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
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
  }
  const sendTextOfCategory = () => {
    if (informationToEdit !== undefined) {
      updateOrganization({
        id: informationToEdit.id,
        name: textOfOrganization,
        contractId: informationToEdit.contractId,
      });
      handleOpenOrClose();
    } else {
      newOrganization(textOfOrganization);
      handleOpenOrClose();
    }
  };
  return (
    <Fragment>
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>
          {informationToEdit !== undefined
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
          {informationToEdit !== undefined ? 'Editar' : 'Crear'}
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