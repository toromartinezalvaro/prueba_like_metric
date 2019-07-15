import React from 'react';

const user = props => {

  return (
    <div>
      <div 
      // className={styles.Actions}
      >
          <button onClick={props.logoutAction}>Cerrar Sesión</button>
          <button onClick={props.updatePassword}>Cambiar contraseña</button>
      </div>
    </div>
  )
}

export default user