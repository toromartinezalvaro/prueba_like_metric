import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ExtraFees = ({ endOfSalesDate, months }) => {
  const today = moment();
  const endDate = moment(endOfSalesDate, 'x');
  const diffDate = endDate.diff(today, 'months');
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Fecha hoy</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{today.format('MMM-YY')}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Fecha Fin de construcción</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{endDate.format('MMM-YY')}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Meses para entrega</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{diffDate}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Plazo Pago CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{months} Meses</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Meses Disfrute CI</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{months - diffDate}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  endOfSalesDate: state.financial.dialog.info.dates.endOfSalesDate,
  months: state.financial.dialog.info.initialFee.months,
});

const mapDispatchToProps = {};

ExtraFees.propTypes = {
  endOfSalesDate: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExtraFees);
