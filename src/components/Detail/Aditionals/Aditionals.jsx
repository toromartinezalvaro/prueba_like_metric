import React from "react";
import styles from "../Aditionals/Aditionals.module.scss"

const aditionals = props => {
  return (
    <div>
      <div className={styles.Card}>
        <h3>{props.Titulo}</h3>
        <div className={styles.Container}>
          <div>
            <p><b>{props.Titulo1}</b></p>
            <p><b>{props.Titulo2}</b></p>
            <p><b>{props.Titulo3}</b></p>
          </div>
          <div>
            <p>{props.Value1}</p>
            <p>{props.Value2}</p>
            <p>{props.Value3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aditionals;
