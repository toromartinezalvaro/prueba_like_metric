import React, { Fragment } from 'react';
import Input from '../../UI/Input/Input';
import styles from './PasswordEditor.module.scss';

const PasswordEditor = props => {
  const samePasswordValidation = {
    fn: value => {
      return value == props.password;
    },
    message: 'Debes ingresar una contraseña igual en los dos campos',
  };

  return (
    <Fragment>
      <Input
        name="password"
        validations={[]}
        onChange={props.onChange}
        value={props.password}
        type="password"
      />
      <Input
        name="confirmPassword"
        validations={[samePasswordValidation]}
        onChange={props.onChange}
        value={props.confirmPassword}
        type="password"
      />
    </Fragment>
  );
};

export default PasswordEditor;
