import React from "react";
import styles from "../Insights/Insights.module.scss";
import Card, { CardHeader, CardBody } from "../../UI/Card/Card";

const aditionals = props => {
  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <div className={styles.Icon} style={{ background: props.color }}>
          <i className={props.icon} />
        </div>
        <div>
          <label className={styles.Label} style={{ color: props.color }}>
            {props.title}
          </label>
          <p className={styles.P}>{props.value}</p>
        </div>
      </div>
    </div>
  );
};

export default aditionals;
