import React from 'react';
import Input from '../UI/Input/Input';

const schema = props => {
  const emailValidation = [
    {
      fn: value => {
        let emailExp = '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
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
        name="password"
        onChange={props.onChange}
        value={props.password}
        validations={[]}
        disable={false}
      />
    </div>
  )
}

export default schema