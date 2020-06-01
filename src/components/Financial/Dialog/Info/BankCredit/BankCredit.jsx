import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from './Dialog';
import Numbers from '../../../../../helpers/numbers';

const BankCredit = ({ totalPaymentCredit, monthlyPayment }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Crédito Banco</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <NumberFormat
                  value={Numbers.toFixed(totalPaymentCredit)}
                  displayType="text"
                  prefix="$"
                  thousandSeparator
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Cuota Mes Banco</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <NumberFormat
                  value={Numbers.toFixed(monthlyPayment)}
                  displayType="text"
                  prefix="$"
                  thousandSeparator
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Dialog />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    totalPaymentCredit,
    monthlyPayment,
  } = state.financial.dialog.info.bank.root;
  return { totalPaymentCredit, monthlyPayment };
};

BankCredit.propTypes = {
  totalPaymentCredit: PropTypes.number.isRequired,
  monthlyPayment: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(BankCredit);
