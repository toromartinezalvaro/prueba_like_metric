import React from 'react';
import Input from '../UI/Input/Input';
import styles from './Login.module.scss';
import Card, { CardHeader, CardBody } from '../../components/UI/Card/Card';
import Error from '../../components/UI/Error/Error';
import Button from '../UI/Button/Button';

const login = props => {
  const emailValidation = [
    {
      fn: value => {
        let emailExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const pattern = new RegExp(emailExp);
        return pattern.test(value);
      },
      message: 'Debe ser un email válido',
    },
  ];

  const keyHandler = e => {
    return e.key === 'Enter' ? props.loginAction() : null;
  };

  return (
    <div>
      {props.currentErrorMessage !== '' ? (
        <Error message={props.currentErrorMessage} />
      ) : null}
      <div className={styles.Container} onKeyDown={keyHandler} tabIndex="0">
        <Card>
          <CardHeader>
            <p>Login</p>
          </CardHeader>
          <CardBody>
            <div className={styles.Row}>
              <Input
                className={styles.Input}
                name="email"
                onChange={props.onChange}
                value={props.email}
                validations={emailValidation}
                disable={false}
                placeholder={'Correo'}
                forceUpdate={true}
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
                placeholder={'Contraseña'}
                forceUpdate={true}
              />

              <div
              // className={styles.Actions}
              >
                {
                  <Button className={styles.Button} onClick={props.loginAction}>
                    Login
                  </Button>
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
