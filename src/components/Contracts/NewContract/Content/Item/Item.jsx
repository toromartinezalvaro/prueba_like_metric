/*
 * Created by Jcatman on Fri Nov 15 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './Item.module.scss';

const Item = ({ handleCloseItem, newItem, updateItem, informationToEdit }) => {
  const [textOfItem, setTextOfItem] = useState('');
  const changeTextOfItem = (e) => {
    setTextOfItem(e.target.value);
  };
  const sendTextOfItem = () => {
    if (informationToEdit) {
      newItem(textOfItem);
      handleCloseItem();
    }
    updateItem({
      id: informationToEdit.id,
      name: textOfItem,
      contractId: informationToEdit.contractId,
    });
    handleCloseItem();
  };

  useEffect(() => {
    if (informationToEdit) {
      setTextOfItem(informationToEdit.name);
    }
  }, []);
  return (
    <Fragment>
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>
          {informationToEdit ? 'Nuevo Item' : 'Editar Item'}
        </div>
      </Typography>
      <div container className={styles.gridContainer}>
        <div className={styles.itemCreator}>
          <TextField
            fullWidth
            required
            className={styles.textField}
            label="Nombre del item"
            margin="normal"
            variant="outlined"
            value={textOfItem}
            onChange={changeTextOfItem}
          />
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          startIcon={<AddIcon />}
          onClick={sendTextOfItem}
        >
          {informationToEdit ? 'Crear' : 'Editar'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={`${styles.button} ${styles.buttonMargin}`}
          startIcon={<Icon className="fas fa-ban" />}
          onClick={handleCloseItem}
        >
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  informationToEdit: PropTypes.object,
  editable: PropTypes.bool,
};

export default Item;
