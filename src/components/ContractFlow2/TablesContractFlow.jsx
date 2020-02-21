import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
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
  const [columns, setColumns] = useState([
    { name: 'subject', title: ' ' },
    { name: 'acumulado', title: 'Acumulado' },
    { name: 'projected', title: 'Proyectado' },
    { name: 'total', title: 'Total' },
  ]);

  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'channel', width: 40 },
    { columnName: 'subject', width: 180 },
    { columnName: 'proyectado', width: 40 },
    { columnName: 'Total', width: 40 },
  ]);

  useEffect(() => {
    let active = true;
    if (active) {
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

      const columnsPerLine = billings.map((bill, n) => {
        let initialNumber = 0;
        let finalNumber = 0;
        const datesNumberInitial = bill.items[n].contracts.map((date) => {
          if (parseInt(date.schedulesDate.salesStartDate) >= initialNumber) {
            initialNumber = parseInt(date.schedulesDate.salesStartDate);
          }
        });

        const datesNumberFinal = bill.items[n].contracts.map((date) => {
          console.log(
            '--->',
            setTimeout(() => {
              return date.billing;
            }, 100),
          );
        });
        const numberOfDates = moment(finalNumber).diff(
          initialNumber,
          'months',
          true,
        );

        const objects = [];

        for (let index = 0; index <= numberOfDates; index++) {
          objects.push({
            date: moment(initialNumber)
              .add(index, 'M')
              .format('MMM YYYY'),
          });
        }

        return objects;
      });

      columnsPerLine.map((item) => {
        setTableColumnExtensions(...tableColumnExtensions, item);
      });
      setRows(rowsPerLine);
    }
    return () => {
      active = false;
    };
  }, [billings]);

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
