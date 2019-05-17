import React from "react";
import styles from "../Adicionales/Adicionales.module.scss"

const adicionales = props => {
  return (
    <div>
      <div className={styles.Card}>
        <h3>{props.Titulo}</h3>
        <div className={styles.Container}>
          <div className={styles.column}>
            <p><b>Cantidad</b></p>
            <p><b>Precio</b></p>
            <p><b>Adicionales</b></p>
          </div>
          <div className={styles.column}>
            <p>{props.Valor1}</p>
            <p>{props.Valor2}</p>
            <p>{props.Valor3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adicionales;
