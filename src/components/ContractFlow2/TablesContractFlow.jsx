import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

const TablesContractFlow = () => {
  const [columns] = useState([
    { name: 'subject', title: ' ' },
    { name: 'subject_value', title: ' ' },
    { name: 'channel', title: 'Channel' },
  ]);
  const [rows] = useState([{ subject: 'REGION' }]);
  const [tableColumnExtensions] = useState([
    { columnName: 'channel', width: 120 },
    { columnName: 'subject', width: 230 },
    { columnName: 'subject_value', width: 230 },
  ]);
  const [leftColumns] = useState(['subject', 'subject_value']);

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
