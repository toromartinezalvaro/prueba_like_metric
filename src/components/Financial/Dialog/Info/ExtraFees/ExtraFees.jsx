import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Numbers from '../../../../../helpers/numbers';

const ExtraFees = ({
  totalExtraFees,
  totalBonus,
  totalLayoffs,
  anotherExtraFees,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Total Cuotas Extras</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(totalExtraFees)}
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
            <Typography>Primas</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(totalBonus)}
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
            <Typography>Cesantías</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(totalLayoffs)}
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
            <Typography>Otras Cuotas Extras</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <NumberFormat
                value={Numbers.toFixed(anotherExtraFees)}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const {
    totalExtraFees,
    totalBonus,
    totalLayoffs,
    anotherExtraFees,
  } = state.financial.dialog.info.extraFees;
  return { totalExtraFees, totalBonus, totalLayoffs, anotherExtraFees };
};

ExtraFees.propTypes = {
  totalExtraFees: PropTypes.number.isRequired,
  totalBonus: PropTypes.number.isRequired,
  totalLayoffs: PropTypes.number.isRequired,
  anotherExtraFees: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(ExtraFees);
