import React, { Fragment } from "react";
import Input from '../../UI/Input/Input'
import styles from "./PasswordEditor.module.scss"

const PasswordEditor = props => {

  return (
    <Fragment>
      <Input
        name="password"
        validations={[]}
        onChange={props.onChange}
        value={props.password}
      />
      <Input
        name="confirmPassword"
        validations={[]}
        onChange={props.onChange}
        value={props.confirmPassword}
      />
  </Fragment>
  );
};

export default PasswordEditor;