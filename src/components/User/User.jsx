import React from 'react';
import Input from '../UI/Input/Input';

const user = props => {
  const emailValidation = [
    {
      fn: value => {
        let emailExp = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const pattern = new RegExp(emailExp);
        return pattern.test(value);
      },
      message: "Debe ser un email válido"
    }
  ];


  return (
    <div>
      <div 
      // className={styles.Actions}
      >
        {
          <button onClick={props.logoutAction}>Logout</button>
        }
      </div>
    </div>
  )
}

export default user