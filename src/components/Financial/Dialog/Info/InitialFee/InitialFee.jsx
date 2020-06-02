import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Numbers from '../../../../../helpers/numbers';

const InitialFee = ({
  initialFeeValue,
  separationValue,
  monthlyFee,
  months,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Valor CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(initialFeeValue)}
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
            <Typography>Separación</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(separationValue)}
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
            <Typography>Cuota Mensual</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(monthlyFee)}
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
            <Typography>Plazo Cuota Inicial</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{months}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const {
    initialFeeValue,
    separationValue,
    monthlyFee,
    months,
  } = state.financial.dialog.info.initialFee;
  return { initialFeeValue, separationValue, monthlyFee, months };
};

InitialFee.propTypes = {
  initialFeeValue: PropTypes.number.isRequired,
  separationValue: PropTypes.number.isRequired,
  monthlyFee: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(InitialFee);
