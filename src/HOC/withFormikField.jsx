import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

export default (WrappedComponent) => {
  const withFormikField = ({ field, form, ...props }) => {
    const { name } = field;
    const errors = getIn(form.errors, name);
    const touched = getIn(form.touched, name);
    const error = touched && errors;
    return (
      <WrappedComponent
        error={Boolean(error)}
        helperText={error}
        {...field}
        {...props}
      />
    );
  };

  withFormikField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  return withFormikField;
};
