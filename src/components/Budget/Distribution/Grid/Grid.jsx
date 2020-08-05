import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray, FastField } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import MuiTextField from '@material-ui/core/TextField';
import MuiGrid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import withFormikField from '../../../../HOC/withFormikField';
import Numbers from '../../../../helpers/numbers';
import Units from './Units';

const TextField = withFormikField(MuiTextField);

const validationSchema = yup.object({
  distribution: yup
    .array()
    .of(
      yup
        .number()
        .typeError('La velocidad de ventas debe ser un número')
        .min(0, `La velocidad de ventas debe ser superior a 0`)
        .max(94, `La velocidad de ventas no puede ser superior a 94`)
        .required('Se requiere una velocidad de ventas'),
    )
    .required('Se debe ingresar una distribucion de ventas'),
});

const Grid = ({ units, length, startDate, submitHandler }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        distribution: Array(
          Math.round(Numbers.cleanNumber(units / length)),
        ).fill(''),
      }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ values }) => (
        <Form>
          <Units
            units={units}
            accumulated={values.distribution.reduce(
              (acc, val) => acc + Number(val),
              0,
            )}
          />
          <Box overflow="auto">
            <MuiGrid container wrap="nowrap" spacing={1}>
              <FieldArray name="distribution">
                {() =>
                  values.distribution.map((_, index) => (
                    <MuiGrid key={`distribution-${index}`} item>
                      <Box width="150px" py={2}>
                        <FastField
                          name={`distribution.${index}`}
                          label={moment(startDate)
                            .add(index, 'months')
                            .format('MMM-YY')}
                          variant="outlined"
                          component={TextField}
                        />
                      </Box>
                    </MuiGrid>
                  ))
                }
              </FieldArray>
            </MuiGrid>
          </Box>
          <Button type="submit" fullWidth color="primary" variant="contained">
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

Grid.propTypes = {
  length: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  startDate: PropTypes.any.isRequired, // TODO: Buscar valores para moment
  submitHandler: PropTypes.func.isRequired,
};

export default Grid;
