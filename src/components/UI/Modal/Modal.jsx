import React from 'react';
import styles from './Modal.module.scss';

const modal = props => {

  const hiddenStyle = {
    display: 'none'
  };

  const performAction = action => {
    if (action === 'confirm') {
      props.onConfirm();
    } else if (action === 'cancel') {
      props.onCancel();
    }
  };

  return (
    <div className={styles.Container} style={props.hidden ? hiddenStyle : {}} >
      <div className={styles.Modal}>
        <div className={styles.Title}>
          {props.title}
        </div>
        <div className={styles.Content}>
          {props.children}
        </div>
        <div className={styles.Actions}>
          <button
            className={styles.ConfirmButton}
            onClick={() => { performAction('confirm') }}>
            Confirmar
          </button>
          <button
            className={styles.CancelButton}
            onClick={() => { performAction('cancel') }}>
            Cancelar
          </button>
        </div>
      </div>
    </div >
  );
}

export default modal;