import React from "react";
import Accordion from "../../UI/Accordion/Accordion";
import Table from "../../UI/Table/Table";
import styles from "./SummaryTable.module.scss";

const summaryTable = ({
  title,
  intersect,
  headers,
  columns,
  data,
  stats,
  ...rest
}) => {
  return (
    <Accordion trigger={title}>
      <div className={styles.statContainer}>
        {stats.map(stat => (
          <div className={styles.stat}>
            <div className={styles.statHeader}>{stat.title}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>
      <Table
        intersect={intersect}
        headers={headers}
        columns={columns}
        data={data}
      />
    </Accordion>
  );
};

export default summaryTable;
