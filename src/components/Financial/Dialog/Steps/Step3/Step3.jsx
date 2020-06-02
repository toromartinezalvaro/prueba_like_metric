import React from 'react';
import PropTypes from 'prop-types';
import { getUnixTime } from 'date-fns';
import { Field, FieldArray } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input, { CURRENCY } from '../../../../UI2/FormatInput';
import DatePicker from './DatePicker';

const Step3 = ({ additionalFees }) => {
  return (
    <Grid container spacing={1}>
      <FieldArray
        name="additionalFees"
        render={(arrayHelpers) => (
          <>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() =>
                arrayHelpers.push({ date: getUnixTime(new Date()), price: 0 })
              }
            >
              Agregar
            </Button>
            {additionalFees.map((_additionalFee, index) => (
              <Grid item xs={12} key={`additionalFee-${index}`}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Field
                      name={`additionalFees[${index}].date`}
                      component={DatePicker}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name={`additionalFees[${index}].price`}
                      placeholder="$3,000,000"
                      variant="outlined"
                      mask={CURRENCY}
                      fullWidth
                      component={Input}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </>
        )}
      ></FieldArray>
    </Grid>
  );
};

Step3.propTypes = {
  additionalFees: PropTypes.array.isRequired,
};

export default Step3;
