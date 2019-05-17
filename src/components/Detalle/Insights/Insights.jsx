import React from "react";
import styles from "../Insights/Insights.module.scss";
import Card, { CardHeader, CardBody } from "../../UI/Card/Card";

const adicionales = props => {
  return (
    <div >
      <div className={styles.Container}>
        <div className={styles.Icon} style={{ background: props.color }}>
          <i className={props.icon} />
        </div>
        <div  className={styles.Background} style={{ flexDirection: "column" }}>
          <label className={styles.Label} style={{ color: props.color }}>
            {props.title}
          </label>
          <p className={styles.P}>{props.value}</p>
        </div>
      </div>
    </div>
  );
};

export default adicionales;
