import React from 'react';
import { Dialog, DialogContentText, CircularProgress } from '@material-ui/core';
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
      <CircularProgress />
    </Dialog>
  );
}
