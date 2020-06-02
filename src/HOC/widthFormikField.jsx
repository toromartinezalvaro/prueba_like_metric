import React from 'react';

export default function withFormikField(WrappedComponent) {
  return ({ field, ...rest }) => {
    return <WrappedComponent {...field} {...rest} />;
  };
}
