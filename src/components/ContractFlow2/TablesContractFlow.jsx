import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';
import NumberFormat from 'react-number-format';
import { Numbers } from '../../helpers';

const isAContract = (row) => {
  return row && row.group && row.item;
};

const isAnItem = (row) => {
  return row && row.group && !row.item;
};

const isAGroup = (row) => {
  return row && !row.group && !row.item;
};

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter((r) => {
    if (isAGroup(row)) {
      return isAnItem(r) && r.group === row.id;
    }
    if (isAnItem(row)) {
      return isAContract(r) && r.item === row.id;
    }
    return r.group === row && r.item === row;
  });
  return childRows.length ? childRows : null;
};

const makeDynamicColumns = (currentColums, dates) => {
  const newColumns = dates.map((date) => {
    return { name: date.date, title: date.date };
  });

  return [...currentColums, ...newColumns];
};

// const numberFormaterText = (currency) => {
//   const number = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(currency);
//   return number;
// };

const numberFormater = (number) => {
  return (
    <NumberFormat
      value={Numbers.toFixed(number, 0)}
      thousandSeparator
      displayType={'text'}
      isNumericString
      decimalSeparator={false}
      prefix="$"
    />
  );
};

const makeObjectWithDates = (object, group = null, item = null) => {
  const rowForDates = object.dates.reduce(
    (currentRow, dateAndPrice) => {
      return {
        ...currentRow,
        [dateAndPrice.date]: numberFormater(Number(dateAndPrice.price)),
      };
    },
    {
      id: object.id,
      name: object.name,
      accumulated: numberFormater(Number(object.accumulated)),
      projected: numberFormater(Number(object.projected)),
      total: numberFormater(Number(object.total)),
      group,
      item,
    },
  );

  return rowForDates;
};

const generateRows = (groups) => {
  const rows = groups.reduce((arrayGroups, group) => {
    const groupRow = makeObjectWithDates(group);
    const itemRows = group.items.reduce((arrayItems, item) => {
      const itemRow = makeObjectWithDates(item, group.id);
      const contractRows = item.contracts.reduce((arrayContracts, contract) => {
        const contractRow = makeObjectWithDates(contract, group.id, item.id);
        return [...arrayContracts, contractRow];
      }, []);
      return [...arrayItems, itemRow, ...contractRows];
    }, []);
    return [...arrayGroups, groupRow, ...itemRows];
  }, []);

  return rows;
};

const TablesContractFlow = ({ groups }) => {
  const columnDates = groups[0] ? groups[0].dates : [];
  const [columns] = useState(
    makeDynamicColumns(
      [
        { name: 'name', title: ' ' },
        { name: 'accumulated', title: 'Acumulado' },
        { name: 'projected', title: 'Proyectado' },
        { name: 'total', title: 'Total' },
      ],
      columnDates,
    ),
  );
  const [tableColumnExtensions] = useState([
    { columnName: 'name', width: 250 },
    { columnName: 'accumulated', width: 150 },
    { columnName: 'projected', width: 150 },
    { columnName: 'total', width: 150 },
  ]);
  const [data] = useState(generateRows(groups));
  const [defaultExpandedRowIds] = useState([]);

  return (
    <Paper>
      <Grid rows={data} columns={columns}>
        <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" />
      </Grid>
    </Paper>
  );
};

export default TablesContractFlow;
