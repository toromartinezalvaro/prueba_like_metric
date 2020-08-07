import React from 'react';
import PropTypes from 'prop-types';
import { getUnixTime } from 'date-fns';
import { Field, FieldArray } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input, { CURRENCY } from '../../../../UI2/FormatInput';
import DatePicker from './DatePicker';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Step3 = ({ additionalFees, onChange }) => {
  return (
    <Grid container spacing={1}>
      <FieldArray
        name="additionalFees"
        render={(arrayHelpers) => (
          <>
            {additionalFees.map((_additionalFee, index) => (
              <Grid item xs={12} key={`additionalFee-${index}`}>
                <Grid container alignItems="center">
                  <Grid item xs={5}>
                    <DatePicker
                      realValue={_additionalFee.date}
                      name={`${index}--date`}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      value={_additionalFee.price}
                      name={`${index}--price`}
                      placeholder="$3,000,000"
                      variant="outlined"
                      mask={CURRENCY}
                      fullWidth
                      component={Input}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={1} spacing={1}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      edge="end"
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() =>
                arrayHelpers.push({
                  date: getUnixTime(new Date()),
                  price: 0,
                })
              }
            >
              Agregar
            </Button>
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
