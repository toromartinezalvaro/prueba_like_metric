import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import styles from './BusinessPatner.module.scss';

const businessPatner = ({ handleCloseBusinessPatner }) => {
  return (
    <div className={styles.gridContainer}>
      <div>
        <TextField
          required
          fullWidth
          className={styles.textField}
          label="Titulo De Contrato"
          margin="normal"
          variant="outlined"
        />
        <div alignItems="center" className={styles.selects}>
          <div>
            <TextField
              fullWidth
              required
              select
              className={styles.textField}
              label="Socio de negocios"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              className={styles.fab}
              onClick={businessPatner}
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
        </div>
        <div className={styles.selects}>
          <div>
            <TextField
              fullWidth
              select
              className={styles.textField}
              label="Categoria"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
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
        </div>
      </div>
      <div>
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
      </div>
      <div>
        <TextField
          multiline
          fullWidth
          rows="6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default businessPatner;
