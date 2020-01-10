 /*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Typography, Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './Category.module.scss';

const Category = ({
  handleCloseCategory,
  newCategory,
  updateCategory,
  informationToEdit,
}) => {
  const [textOfCategory, setTextOfCategory] = useState('');
  const changeTextOfCategory = (e) => {
    setTextOfCategory(e.target.value);
  };
  const sendTextOfCategory = () => {
    if (informationToEdit === undefined) {
      newCategory(textOfCategory);
      handleCloseCategory();
    } else {
      updateCategory({
        id: informationToEdit.id,
        categoryName: textOfCategory,
        contractId: informationToEdit.contractId,
      });
      handleCloseCategory();
    }
  };

  useEffect(() => {
    if (informationToEdit !== undefined) {
      setTextOfCategory(informationToEdit.categoryName);
    }
  }, []);
  return (
    <Fragment>
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>
          {informationToEdit === undefined ? 'Nuevo Grupo' : 'Editar Grupo'}
        </div>
      </Typography>
      <div container className={styles.gridContainer}>
        <div className={styles.categoryCreator}>
          <TextField
            fullWidth
            required
            className={styles.textField}
            label="Nombre del Grupo"
            margin="normal"
            variant="outlined"
            value={textOfCategory}
            onChange={changeTextOfCategory}
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
          {informationToEdit === undefined ? 'Crear' : 'Editar'}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={`${styles.button} ${styles.buttonMargin}`}
          startIcon={<Icon className="fas fa-ban" />}
          onClick={handleCloseCategory}
        >
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};

Category.propTypes = {
  informationToEdit: PropTypes.object,
  editable: PropTypes.bool,
};

export default Category;
