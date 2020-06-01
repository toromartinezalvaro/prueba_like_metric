import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Item from './Item';
import { openFinancialBankDialog, closeFinancialBankDialog } from './actions';

const Dialog = ({ open, closeHandler, openHandler }) => {
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="small"
        onClick={openHandler}
      >
        Detalles
      </Button>

      <MuiDialog open={open}>
        <DialogTitle>Crédito Banco</DialogTitle>
        <DialogContent>
          <Paper variant="outlined">
            <Grid container>
              <Grid item xs={12}>
                <Item left="Crédito" right=" $ 231,569,947" />
              </Grid>

              <Grid item xs={12}>
                <Item left="Años" right="20" />
              </Grid>

              <Grid item xs={12}>
                <Item left="Meses" right="240" />
              </Grid>

              <Grid item xs={12}>
                <Item left="Tasa ea" right="11.0%" />
              </Grid>

              <Grid item xs={12}>
                <Item left="Tasa em" right="0.9%" noDivider />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeHandler}>
            Cerrar
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  open: state.financial.dialog.info.bank.dialog.open,
});

const mapDispatchToProps = {
  openHandler: openFinancialBankDialog,
  closeHandler: closeFinancialBankDialog,
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  openHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);
