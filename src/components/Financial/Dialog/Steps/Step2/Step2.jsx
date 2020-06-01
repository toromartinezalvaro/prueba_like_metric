import React from 'react';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input, { CURRENCY } from '../../../../UI2/FormatInput';

const Step2 = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography>Valor Separación</Typography>
      </Grid>
      <Grid item xs={6}>
        <Field
          name="separationValue"
          placeholder="$2,000,000"
          variant="outlined"
          mask={CURRENCY}
          fullWidth
          component={Input}
        />
      </Grid>
    </Grid>
  );
};

export default Step2;
