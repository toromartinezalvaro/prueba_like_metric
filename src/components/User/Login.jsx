import React from 'react';
import Input from '../UI/Input/Input';

const schema = props => {
  const emailValidation = [
    {
      fn: value => {
        let emailExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const pattern = new RegExp(emailExp);
        return pattern.test(value);
      },
      message: "Debe ser un email válido"
    }
  ];


  return (
    <div>
      <Input
        // className={styles.Input}
        name="email"
        onChange={props.onChange}
        value={props.email}
        validations={emailValidation}
        disable={false}
      />

      <Input
        // className={styles.Input}
        type="password"
        name="password"
        onChange={props.onChange}
        value={props.password}
        validations={[]}
        disable={false}
      />

      <div 
      // className={styles.Actions}
      >
        {
          <button onClick={props.loginAction}>Login</button>
        }
      </div>
    </div>
  )
}

export default schema