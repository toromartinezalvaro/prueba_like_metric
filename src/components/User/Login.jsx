import React from "react";
import Input from "../UI/Input/Input";
import styles from "./Login.module.scss";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Error from "../../components/UI/Error/Error";

const login = props => {
  const emailValidation = [
    {
      fn: value => {
        let emailExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const pattern = new RegExp(emailExp);
        return pattern.test(value);
      },
      message: "Debe ser un email válido"
    }
  ];

  return (
    <div>
      {props.currentErrorMessage !== "" ? (
        <Error message={props.currentErrorMessage} />
      ) : null}
      <div className={styles.Container}>
        <Card className={styles.Card}>
          <CardHeader>
            <p>Login</p>
          </CardHeader>
          <CardBody>
            <div className={styles.Row}>
              <Input
                // className={styles.Input}
                name="email"
                onChange={props.onChange}
                value={props.email}
                validations={emailValidation}
                disable={false}
                placeholder={"Correo"}
              />
            </div>
            <div className={styles.Row}>
              <Input
                // className={styles.Input}
                type="password"
                name="password"
                onChange={props.onChange}
                value={props.password}
                validations={[]}
                disable={false}
                placeholder={"Contraseña"}
              />

              <div
              // className={styles.Actions}
              >
                {
                  <button className={styles.Button} onClick={props.loginAction}>
                    Login
                  </button>
                }
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default login;
