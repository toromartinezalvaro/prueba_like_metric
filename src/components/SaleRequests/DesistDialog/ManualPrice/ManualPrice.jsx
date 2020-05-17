import React, { forwardRef } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import CurrencyInput from './CurrencyInput';
import styles from './ManualPrice.module.scss';

const validationSchema = yup.object().shape({
  price: yup.number('El valor debe ser un numero'),
});

const ManualPrice = forwardRef(({ suggestedPrice, onSubmit }, ref) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ price: suggestedPrice }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={ref}
    >
      {() => {
        return (
          <Form>
            <Field
              name="price"
              label="Precio"
              placeholder="$0"
              component={CurrencyInput}
            />
          </Form>
        );
      }}
    </Formik>
  );
});

ManualPrice.displayName = 'ManualPrice';

ManualPrice.propTypes = {
  suggestedPrice: PropTypes.number.isRequired,
  onSubmit: PropTypes.func,
  isHidden: PropTypes.bool,
};

ManualPrice.defaultProps = {
  onSubmit: (values) => {
    console.log(values);
  },
};

export default ManualPrice;
