import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
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
    { columnName: 'acumulated', width: 100 },
    { columnName: 'projected', width: 100 },
    { columnName: 'total', width: 100 },
    { columnName: 'date', width: 100 },
    { columnName: 'group', width: 250 },
    { columnName: 'item', width: 110 },
  ]);

  const formatNumber = (number) => {
    return (
      <NumberFormat
        value={number}
        thousandSeparator
        displayType={'text'}
        isNumericString
        prefix="$"
      />
    );
  };

  const totalFunc = (total) => {
    let totalAdded = 0;
    const completeTotal = total.map((totalValue) => {
      totalAdded += parseInt(totalValue, 10);
      return totalAdded;
    });
    return totalAdded;
  };

  const deepInformation = (bill, group, item) => {
    const information = bill.items.map((value) => {
      return value.contracts.map((val) => {
        const contract = val.title;
        const acumulated =
          val.acumulated.length !== 0 ? parseInt(val.acumulated[0][0], 10) : 0;
        const projected =
          val.projected.length !== 0 ? parseInt(val.projected[0][0], 10) : 0;
        const total = val.total.length !== 0 ? totalFunc(val.total) : 0;

        let result = {
          group,
          item,
          contract,
          acumulated: formatNumber(acumulated),
          projected: formatNumber(projected),
          total: formatNumber(total),
        };
        const datesValues = val.billings.map((dateValue, j) => {
          dateValue.map((singleValue, l) => {
            const name = `date${l}`;
            result = { ...result, [name]: [formatNumber(singleValue)] };
          });
        });
        return result;
      });
    });
    return information;
  };

  const datesInitialNumber = (bill) => {
    let initialNumber = 0;
    bill.items.map((information, x) => {
      if (
        parseInt(information.contracts[x].schedulesDate.salesStartDate, 10) >=
        initialNumber
      ) {
        initialNumber = parseInt(
          information.contracts[x].schedulesDate.salesStartDate,
          10,
        );
      }
    });
    return initialNumber;
  };

  const datesFinalNumber = (bill) => {
    const finalNumber = [];
    bill.items.map((information) => {
      const numberOfContract = information.contracts.length;
      for (let index = 0; index <= numberOfContract; index++) {
        information.contracts.map((info) => {
          info.billing.map((date) => {
            finalNumber.push(date.lastBillingDate);
          });
        });
      }
    });
    return Math.max(...finalNumber);
  };

  useEffect(() => {
    let active = true;
    if (active) {
      const rowsPerLine = () => {
        const rows = [];
        const arrayRows = billings.map((bill) => {
          const group = bill.group;
          const item = bill.items.map((value) => value.item);
          const contracts = deepInformation(bill, group[0], item[0]);
          contracts.map((contract) =>
            contract.map((row) => {
              rows.push(row);
            }),
          );
        });

        return rows;
      };
      let firstPull = true;
      const columnsPerLine = billings.map((bill, n) => {
        const initialDate = datesInitialNumber(bill);
        const finalDate = datesFinalNumber(bill);
        const numberOfDates = moment(finalDate).diff(
          initialDate,
          'months',
          true,
        );
        const objects = [];
        if (firstPull) {
          for (let index = 1; index <= numberOfDates; index++) {
            objects.push({
              name: `date${index}`,
              title: String(
                moment(initialDate)
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
        { name: 'acumulated', title: 'Acumulado' },
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
    'acumulated',
    'projected',
    'total',
    'group',
    'item',
  ]);

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <GroupingState
          grouping={[
            { columnName: 'group', width: 150 },
            { columnName: 'item' },
          ]}
        />
        <IntegratedGrouping />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableGroupRow />
        <TableFixedColumns leftColumns={leftColumns} />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
