import React, { Fragment } from "react";
import { CardHeader } from "../Card/Card";
import styles from "./Error.module.scss";

const error = props => {
  return (
    <Fragment>
      <div className={styles.Container}>
        <div className={styles.Alert} style={{animationDuration: props.duration}} >
          <CardHeader>{props.message}</CardHeader>
        </div>
      </div>
    </Fragment>
  );
};

export default error;
