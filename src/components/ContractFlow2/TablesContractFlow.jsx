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
    { name: 'acumulado', title: 'Acumulado' },
    { name: 'proyectado', title: 'Proyectado' },
    { name: 'Total', title: 'Total' },
    { name: 'channel', title: 'Channel' },
  ]);
  const [rows] = useState([{ subject: 'REGION' }]);
  const [tableColumnExtensions] = useState([
    { columnName: 'channel', width: 100 },
    { columnName: 'subject', width: 100 },
    { columnName: 'acumulado', width: 100 },
    { columnName: 'proyectado', width: 100 },
    { columnName: 'Total', width: 100 },
  ]);
  const [leftColumns] = useState([
    'subject',
    'acumulado',
    'proyectado',
    'Total',
  ]);

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
