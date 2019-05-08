import React, { Fragment, useState } from "react";
import styles from "./Modal.module.scss";

const modal = props => {
  const [blocked, setBlocked] = useState(false);

  const performAction = action => {
    if (action === "confirm") {
      setBlocked(true);
      props.onConfirm();
    } else if (action === "cancel") {
      props.onCancel();
    }
  };

  return (
    <Fragment>
      {props.hidden ? null : (
        <div className={styles.Container}>
          <div className={styles.Modal}>
            <div className={styles.Title}>{props.title}</div>
            <div className={styles.Content}>{props.children}</div>
            <div className={styles.Actions}>
              <button
                className={styles.ConfirmButton}
                onClick={() => {
                  performAction("confirm");
                }}
                disabled={blocked}
              >
                Confirmar
              </button>
              <button
                className={styles.CancelButton}
                onClick={() => {
                  performAction("cancel");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default modal;
