import React from "react";
import styles from "./SummaryCell.module.scss";
import NumberFormat from "react-number-format";

const summaryCell = ({ children, k, ...rest }) => (
  <div className={styles.container} {...rest}>
    <div className={styles.content}>
      {children ? (
        <NumberFormat
          value={parseFloat(children[k]).toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
        />
      ) : (
        "-"
      )}
    </div>
  </div>
);

export default summaryCell;
