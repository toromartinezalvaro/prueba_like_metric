import React from 'react';

const user = props => {

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