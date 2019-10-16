import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import styles from './GeneralInfo.module.scss';

const GeneralInfo = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [expanded, setExpanded] = useState('GeneralInfo');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      className={styles.gridContainer}
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item xs={6} md={6}>
        <TextField
          required
          fullWidth
          className={styles.textField}
          label="Titulo De Contrato"
          margin="normal"
          variant="outlined"
        />
        <Grid
          container
          direction="row"
          alignItems="center"
          className={styles.selects}
          spacing={2}
          justify="center"
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              select
              className={styles.textField}
              label="Socio de negocios"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          className={styles.selects}
          alignItems="center"
          spacing={2}
          justify="center"
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              className={styles.textField}
              label="Categoria"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6}>
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
      </Grid>
      <Grid xs={12} md={12}>
        <TextField
          multiline
          fullWidth
          rows="6"
          className={styles.multiline}
          label="Descripción/Comentarios"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
