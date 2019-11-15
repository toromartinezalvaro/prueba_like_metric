/*
 * Created by Jcatman on Fri Nov 15 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import styles from './Item.module.scss';

const Item = ({ handleCloseItem, newItem, updateItem, informationToEdit }) => {
  const [textOfItem, setTextOfItem] = useState('');
  const changeTextOfItem = (e) => {
    setTextOfItem(e.target.value);
  };
  const sendTextOfItem = () => {
    if (informationToEdit !== undefined) {
      updateItem({
        id: informationToEdit.id,
        name: textOfItem,
        contractId: informationToEdit.contractId,
      });
      handleCloseItem();
    } else {
      newItem(textOfItem);
      handleCloseItem();
    }
  };

  useEffect(() => {
    if (informationToEdit !== undefined) {
      setTextOfItem(informationToEdit.itemName);
    }
  }, []);
  return (
    <Fragment>
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>
          {informationToEdit !== undefined ? 'Editar Grupo' : 'Nuevo Grupo'}
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
          {informationToEdit !== undefined ? 'Editar' : 'Crear'}
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
