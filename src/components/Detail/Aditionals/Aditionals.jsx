import React from 'react';
import styles from "./Aditionals.module.scss";

const aditionals = (props) => {
  return (
    <div>
      <div className={styles.Card}>
        <h3>{props.Title}</h3>
        <div className={styles.Container}>
          <div>
            <p>
              <b>{props.Title1}</b>
            </p>
            <p>
              <b>{props.Title2}</b>
            </p>
            <p>
              <b>{props.Title3}</b>
            </p>
            <p>
              <b>{props.Title4}</b>
            </p>
          </div>
          <div>
            <p>{props.Value1}</p>
            <p>{props.Value2}</p>
            <p>{props.Value3}</p>
            <p>{props.Value4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aditionals;
