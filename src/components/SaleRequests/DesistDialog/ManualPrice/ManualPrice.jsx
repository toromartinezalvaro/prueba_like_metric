import React, { forwardRef } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import CurrencyInput from './CurrencyInput';
import styles from './ManualPrice.module.scss';

const validationSchema = yup.object().shape({
  price: yup.number('El valor debe ser un numero'),
});

const ManualPrice = forwardRef(({ onSubmit, isHidden }, ref) => {
  return (
    <div className={isHidden ? styles.hide : ''}>
      <Formik
        initialValues={{ price: 0 }}
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
                placeholder="$1,935.46"
                component={CurrencyInput}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

ManualPrice.displayName = 'ManualPrice';

ManualPrice.propTypes = {
  onSubmit: PropTypes.func,
  isHidden: PropTypes.bool,
};

ManualPrice.defaultProps = {
  onSubmit: (values) => {
    console.log(values);
  },
};

export default ManualPrice;
