import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Item from './Item';
import { openFinancialBankDialog, closeFinancialBankDialog } from './actions';
import Numbers from '../../../../../../helpers/numbers';

const Dialog = ({
  open,
  totalPaymentCredit,
  totalYears,
  months,
  anualEffectiveRate,
  monthlyRate,
  closeHandler,
  openHandler,
}) => {
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
                <Item
                  left="Crédito"
                  right={
                    <NumberFormat
                      value={Numbers.toFixed(totalPaymentCredit)}
                      displayType="text"
                      prefix="$ "
                      thousandSeparator
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Item left="Años" right={totalYears} />
              </Grid>

              <Grid item xs={12}>
                <Item left="Meses" right={months} />
              </Grid>

              <Grid item xs={12}>
                <Item
                  left="Tasa ea"
                  right={
                    <NumberFormat
                      value={Numbers.toFixed(anualEffectiveRate * 100)}
                      displayType="text"
                      suffix="%"
                      thousandSeparator
                    />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Item
                  left="Tasa em"
                  right={
                    <NumberFormat
                      value={Numbers.toFixed(monthlyRate * 100)}
                      displayType="text"
                      suffix="%"
                      thousandSeparator
                    />
                  }
                  noDivider
                />
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

const mapStateToProps = (state) => {
  const {
    open,
    totalPaymentCredit,
    totalYears,
    months,
    anualEffectiveRate,
    monthlyRate,
  } = state.financial.dialog.info.bank.dialog;
  return {
    open,
    totalPaymentCredit,
    totalYears,
    months,
    anualEffectiveRate,
    monthlyRate,
  };
};

const mapDispatchToProps = {
  openHandler: openFinancialBankDialog,
  closeHandler: closeFinancialBankDialog,
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  totalPaymentCredit: PropTypes.number.isRequired,
  totalYears: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
  anualEffectiveRate: PropTypes.number.isRequired,
  monthlyRate: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  openHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);