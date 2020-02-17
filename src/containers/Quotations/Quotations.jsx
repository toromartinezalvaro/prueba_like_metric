import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Header from '../../components/Quotations/Header';
import MonthlyPayments from '../../components/Quotations/Table';
import Styles from './Quotations.module.scss';

const Quotations = () => {
  return (
    <div>
      <Dialog open fullScreen>
        <DialogTitle>Cotización</DialogTitle>
        <DialogContent>
          <Header />

          <MonthlyPayments />
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Quotations;
