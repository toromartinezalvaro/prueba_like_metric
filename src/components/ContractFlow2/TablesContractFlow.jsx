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
  const [columns, setColumns] = useState([]);

  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'channel', width: 27 },
    { columnName: 'subject', width: 180 },
    { columnName: 'proyectado', width: 27 },
    { columnName: 'total', width: 90 },
    { columnName: 'date', width: 100 },
  ]);

  useEffect(() => {
    let active = true;
    if (active) {
      const rowsPerLine = billings.map((bill, n) => {
        const group = bill.group;
        const item = bill.items.map((value) => value.item);
        const contract = bill.items.map((value) =>
          value.contracts.map((val) => val.title),
        );
        const acumulated = bill.items.map((value, i) =>
          String(value.contracts[i].acumulated[0][0]),
        );

        const projected = bill.items.map((value, i) =>
          value.contracts[i].projected[0][0]
            ? String(value.contracts[i].projected[0][0])
            : 0,
        );
        const total = bill.items.map((value, i) =>
          value.contracts[i].total ? String(value.contracts[i].total) : 0,
        );

        let result = {
          subject: item,
          acumulado: acumulated,
          projected,
          total: parseInt(total[n], 10),
        };

        const datesValues = bill.items.map((value, i) => {
          value.contracts[i].billings[i].map((val, j) => {
            const name = `date${j}`;
            result = { ...result, [name]: val };
          });
        });

        return result;
      });

      let firstPull = true;

      const columnsPerLine = billings.map((bill, n) => {
        let initialNumber = 0;
        let finalNumber = 0;

        const initialDate = bill.items.map((information, x) => {
          if (
            parseInt(
              information.contracts[x].schedulesDate.salesStartDate,
              10,
            ) >= initialNumber
          ) {
            initialNumber = parseInt(
              information.contracts[x].schedulesDate.salesStartDate,
              10,
            );
          }
        });

        const datesNumberFinal = bill.items.map((information, x) => {
          information.contracts[x].billing.map((data) => {
            if (parseInt(data.lastBillingDate, 10) >= finalNumber) {
              finalNumber = parseInt(data.lastBillingDate, 10);
            }
          });
        });

        const numberOfDates = moment(finalNumber).diff(
          initialNumber,
          'months',
          true,
        );

        const objects = [];
        if (firstPull) {
          for (let index = 0; index <= numberOfDates; index++) {
            objects.push({
              name: `date${index}`,
              title: String(
                moment(initialNumber)
                  .add(index, 'M')
                  .format('MMM YYYY'),
              ),
            });
          }
          firstPull = false;
        }

        return objects;
      });

      const columnsPerLineDefined = [];

      columnsPerLine.map((items) => {
        items.map((item) => {
          columnsPerLineDefined.push(item);
        });
      });
      columnsPerLineDefined.unshift(
        { name: 'subject', title: ' ' },
        { name: 'acumulado', title: 'Acumulado' },
        { name: 'projected', title: 'Proyectado' },
        { name: 'total', title: 'Total' },
      );

      setColumns(columnsPerLineDefined);
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
    'total',
  ]);

  return (
    <Paper>
      {console.log('the row ', rows)}
      <Grid rows={rows} columns={columns}>
        <SelectionState />

        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
