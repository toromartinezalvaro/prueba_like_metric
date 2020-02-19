import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import {
  GroupingState,
  SelectionState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';

const TablesContractFlow = ({ billings }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let active = true;
    if (active) {
      /* const parsedRowsData = {};
      const parsedAcemulated = billings.map((bill) => {
        bill.items.map((value, i) =>
          parsedRowsData.push({
            acumulado: String(value.contracts[i].acumulated[0][0]),
          }),
        );
      });
      const parsedItems = billings.map((bill) => {
        bill.items.map((value) => parsedRowsData.push({ subject: value.item }));
      });
      const parsedGroups = billings.map((bill) => {
        const parsed = { subject: bill.group };
        parsedRowsData.push(parsed);
      }); */

      const rowsPerLine = billings.map((bill, n) => {
        const group = bill.group;
        const item = bill.items.map((value) => value.item);
        const acumulated = bill.items.map((value, i) =>
          String(value.contracts[i].acumulated[0][0]),
        );
        const projected = bill.items.map((value, i) =>
          String(value.contracts[i].projected[0][0]),
        );
        const total = bill.items.map((value, i) =>
          String(value.contracts[i].total),
        );
        return {
          subject: group,
          acumulado: acumulated,
          projected,
          total: parseInt(total[n]),
        };
      });

      setRows(rowsPerLine);
    }
    return () => {
      active = false;
    };
  }, [billings]);

  const [columns] = useState([
    { name: 'subject', title: ' ' },
    { name: 'acumulado', title: 'Acumulado' },
    { name: 'projected', title: 'Proyectado' },
    { name: 'total', title: 'Total' },
    { name: 'channel', title: 'Channel' },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'channel', width: 100 },
    { columnName: 'subject', width: 100 },
    { columnName: 'proyectado', width: 100 },
    { columnName: 'Total', width: 100 },
  ]);
  const [leftColumns] = useState([
    'subject',
    'acumulado',
    'projected',
    'Total',
  ]);

  return (
    <Paper>
      {console.log('the row ', rows)}
      <Grid rows={rows} columns={columns}>
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
