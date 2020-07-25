import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import MuiTextField from '@material-ui/core/TextField';
import withFormikField from '../../../../HOC/withFormikFieldV2';

const TextField = withFormikField(MuiTextField);

const createValidationSchema = (units) => {
  const min = (units / 98).toFixed(2);
  const max = units;
  return yup.object({
    length: yup
      .number()
      .typeError('La velocidad de ventas debe ser un número')
      .min(min, `La velocidad de ventas debe ser superior a ${min}`)
      .max(max, `La velocidad de ventas no puede ser superior a ${max}`)
      .required('Se requiere una velocidad de ventas'),
  });
};

const Counter = ({ units, length, setLength }) => {
  const validationSchema = createValidationSchema(units);
  const formRef = useRef();

  const submit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleSubmit = (values) => {
    setLength(Number(values.length));
  };

  return (
    <Formik
      initialValues={{
        length,
      }}
      onSubmit={handleSubmit}
      innerRef={formRef}
      validationSchema={validationSchema}
    >
      {({ handleBlur }) => (
        <Form>
          <TextField
            name="length"
            label="Velocidad de ventas"
            variant="outlined"
            onBlur={(event) => {
              handleBlur(event);
              submit();
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

Counter.propTypes = {
  units: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  setLength: PropTypes.func.isRequired,
};

export default Counter;
