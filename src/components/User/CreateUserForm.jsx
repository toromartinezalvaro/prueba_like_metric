import React from "react";
import Input from "../UI/Input/Input";
import styles from "./CreateUserForm.module.scss";
import Card, { CardHeader, CardBody } from "../UI/Card/Card";
import Error from "../UI/Error/Error";
import {Role} from "../../helpers"
import agent from "../../config/config"

const CreateUserForm = props => {

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
            <p className={styles.Title}>Crear Usuario</p>
          </CardHeader>
          <CardBody>
            <div className={styles.Row}>
              <Input
                className={styles.Input}
                name="name"
                onChange={props.onChange}
                value={props.name}
                validations={[]}
                disable={false}
                placeholder={"Nombre"}
              />
            </div>
            <div className={styles.Row}>
              <select
                className={styles.Input}
                name="name"
                onChange={props.onChange}
                value={props.role}
              >
              {agent.isAuthorized([Role.Super]) &&
                <option value={Role.Super}>Super User</option>
              }
                <option value={Role.Admin}>Administrador</option>
                <option value={Role.User}>Auxiliar</option>
              </select>
            </div>
            <div className={styles.Row}>
              <Input
                className={styles.Input}
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
                className={styles.Input}
                type="password"
                name="password"
                onChange={props.onChange}
                value={props.password}
                validations={[]}
                disable={false}
                placeholder={"Crear Contraseña"}
              />

              <div>
                {
                  <button className={styles.Button} onClick={props.loginAction}>
                    Crear
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

export default CreateUserForm;
