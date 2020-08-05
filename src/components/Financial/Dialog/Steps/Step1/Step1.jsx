import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input, { NUMBER, PERCENTAGE } from '../../../../UI2/FormatInput';
import Numbers from '../../../../../helpers/numbers';

const Step1 = ({ initialFeeRate, onChange }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography>Plazo Cuota inicial</Typography>
          </Grid>
          <Grid item xs={6}>
            <Field
              name="termLimit"
              placeholder="36"
              variant="outlined"
              mask={NUMBER}
              fullWidth
              component={Input}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography>% Cuota Inicial</Typography>
          </Grid>
          <Grid item xs={6}>
            <Field
              name="initialFeeBasePercentage"
              placeholder="30%"
              variant="outlined"
              mask={PERCENTAGE}
              fullWidth
              component={Input}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography>% Cuota Final</Typography>
          </Grid>
          <Grid item xs={6}>
            {Numbers.toFixed(100 - initialFeeRate)}%
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography>Tasa efectiva anual</Typography>
          </Grid>
          <Grid item xs={6}>
            <Field
              name="monthlyRate"
              placeholder="12%"
              variant="outlined"
              mask={PERCENTAGE}
              fullWidth
              component={Input}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Step1.propTypes = {
  initialFeeRate: PropTypes.number.isRequired,
};

export default Step1;
