import React from 'react';
import { useField } from 'formik';

export default function withFormikField(WrappedComponent) {
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  function WithFormikField(props) {
    const [field, meta] = useField(props);

    const error = meta.touched && meta.error;

    return (
      <WrappedComponent
        error={error}
        helperText={error}
        {...field}
        {...props}
      />
    );
  }
  WithFormikField.displayName = `withFormikField(${wrappedComponentName})`;
  return WithFormikField;
}
