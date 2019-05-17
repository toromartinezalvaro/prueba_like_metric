import React from 'react';
import Accordion from '../../UI/Accordion/Accordion';
import Table from '../../UI/Table/Table';

const summaryTable = ({
  title,
  intersect,
  headers,
  columns,
  data,
  ...rest
}) => {
  return (
    <Accordion trigger={title}>
      <div className={style.statContainer}>
        <div className={style.stat}>
          <div className={style.statHeader}>Titulo de la estadística</div>
          <div className={style.statValue}>Estadística</div>
        </div>
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
