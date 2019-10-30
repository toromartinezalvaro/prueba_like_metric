import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from './Category.module.scss';

const Category = ({ handleCloseCategory, newCategory, updateCategory, informationToEdit, editable }) => {
  const [textOfCategory, setTextOfCategory] = useState('');
  const changeTextOfCategory = (e) => {
    setTextOfCategory(e.target.value);
  };
  const sendTextOfCategory = () => {
    if (editable) {
      updateCategory(textOfCategory);
      handleCloseCategory();
    }
    newCategory(textOfCategory);
    handleCloseCategory();
  };

  useEffect(() => {
    if (informationToEdit.categoryName !== '') {
      setTextOfCategory(informationToEdit.categoryName);
    }
  }, []);
  return (
    <Fragment>
      {console.log("Data is:", informationToEdit)}
      <Typography className={styles.heading} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-paste`} />
        </div>
        <div className={styles.titleExpand}>Nueva Categoría</div>
      </Typography>
      <div container className={styles.gridContainer}>
        <div className={styles.categoryCreator}>
          <TextField
            fullWidth
            required
            className={styles.textField}
            label="Nombre de Categoría"
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
          Crear
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
};

export default Category;
