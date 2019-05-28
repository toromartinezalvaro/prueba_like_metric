import React from "react";
import styles from "./SummaryCell.module.scss";

const summaryCell = ({ children, k, ...rest }) => (
  <div className={styles.container} {...rest}>
    <div className={styles.content}>
      <span>{children ? children[k] : "-"}</span>
    </div>
  </div>
);

export default summaryCell;
