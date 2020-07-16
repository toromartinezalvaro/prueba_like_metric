import React from 'react';
import {
  Dialog,
  DialogContentText,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import styles from './styles.module.scss';

export default function LoadingContract({ isLoading }) {
  return (
    <Dialog
      open={isLoading}
      maxWidth="md"
      classes={{
        root: styles.dialog,
        container: styles.dialog,
        paper: styles.dialog,
      }}
    >
      <DialogContentText>
        <div className={styles.container}>
          <CircularProgress />
          <Typography variant="subtitle1">Cargando contrato</Typography>
        </div>
      </DialogContentText>
    </Dialog>
  );
}
