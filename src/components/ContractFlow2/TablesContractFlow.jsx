import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  GroupingState,
  SelectionState,
  IntegratedGrouping,
  CustomGrouping,
} from '@devexpress/dx-react-grid';

const TablesContractFlow = ({ billings }) => {
  const [rows, setRows] = useState([{ group: 'default' }, { item: 'default' }]);
  const [columns, setColumns] = useState([
    { name: 'group', title: 'default' },
    { name: 'item', title: 'default' },
  ]);

  const [tableColumnExtensions, setTableColumnExtensions] = useState([
    { columnName: 'contract', width: 180 },
    { columnName: 'acumulado', width: 89 },
    { columnName: 'projected', width: 89 },
    { columnName: 'total', width: 90 },
    { columnName: 'date', width: 100 },
    { columnName: 'group', width: 100 },
    { columnName: 'item', width: 100 },
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
          contract,
          item,
          group,
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
        { name: 'contract', title: 'Contrato' },
        { name: 'group', title: 'Grupo' },
        { name: 'item', title: 'Item' },
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
    'contract',
    'acumulado',
    'projected',
    'total',
    'group',
    'item',
  ]);

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <GroupingState
          grouping={[{ columnName: 'group' }, { columnName: 'item' }]}
        />
        <IntegratedGrouping />
        <Table />
        <TableHeaderRow />
        <TableGroupRow />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
