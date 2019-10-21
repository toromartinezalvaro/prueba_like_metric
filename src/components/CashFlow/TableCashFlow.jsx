import React, { useState } from 'react';
import Table from '../UI/Table/Table';

const TableCashFlow = (props) => {
  console.log(props.data);
  return (
    <Table
      intersect={'Areas'}
      headers={['Precio']}
      columns={['areas', '2', '3']}
      data={props.data}
      maxHeight={{ maxHeight: '36vh' }}
    />
  );
};

export default TableCashFlow;
