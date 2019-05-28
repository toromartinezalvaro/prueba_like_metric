import React from "react";
import styles from "./Table.module.scss";

const table = ({ intersect, columns, headers, data, style, width }) => {
  console.log(style);
  return (
    <div className={styles.Container}>
      <div className={styles.Intersect}>{intersect}</div>

      <div className={styles.Header} >
        {headers.map(element => (
          <div style={width}>{element}</div>
        ))}
      </div>

      <div className={styles.Columns} style={style}>
        {columns.map(element => (
          <div>{element}</div>
        ))}
      </div>

      <div className={styles.Table}>
        {data.map(row => (
          <div className={styles.Row}>
            {row.map(cell => (
              <div className={styles.Cell} style={width}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default table;
