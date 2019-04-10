import React from 'react';
import styles from './Table.module.scss';

const table = props => {

  return (
    <div className={`${styles["sticky-wrap"]} ${styles["overflow-y"]}`}>

      <table className={styles["sticky-enabled"]} style={{ margin: 0, width: "100%" }}>
        <thead>
          <tr>
            <th>{props.intercept}</th>
            {props.headers.map((header, headerIndex) => <th key={`th-${headerIndex}`}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.columns.map((column, columnIndex) => {
            return (
              <tr key={`column-${columnIndex}`}>
                <th>{column}</th>
                {props.data[columnIndex].map((data, dataIndex) => (
                  <td key={`data-${columnIndex}-${dataIndex}`}>{data}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className={styles["sticky-thead"]}>
        <thead>
          <tr>
            {props.headers.map((header, headerIndex) => <th key={`th-${headerIndex}`}>{header}</th>)}
          </tr>
        </thead>
      </table>

      <table className={styles["sticky-col"]} >
        <thead>
          <tr>
            <th>Areas</th>
            <th>Interior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>201</th>
          </tr>

        </tbody>
      </table>

      <table className={styles["sticky-intersect"]} >
        <thead>
          <tr>
            <th>{props.intercept}</th>
          </tr>
        </thead>
      </table>

    </div>
  );

}

export default table;