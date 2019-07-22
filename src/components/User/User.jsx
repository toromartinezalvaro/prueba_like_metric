import React from 'react';
import Button from '../UI/Button/Button';

const user = props => {
  return (
    <div>
      <div
      // className={styles.Actions}
      >
        <Button onClick={props.logoutAction}>Cerrar Sesión</Button>
        <Button onClick={props.updatePassword}>Cambiar contraseña</Button>
      </div>
    </div>
  );
};

export default user;
