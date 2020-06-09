import React from 'react';
import moment from 'moment';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import styles from './TableCashFlow.module.scss';

const TableCashFlow = (props) => {
  const arrayCashFlowWhitFixed = props.data.map((group) => {
    const columns = [
      { name: 'type', title: ' ' },
      { name: 'acumulated', title: 'Acumulado' },
      { name: 'projected', title: 'Proyectado' },
      { name: 'total', title: 'Total' },
    ];
    for (let i = 0; i < group.arrayCashFlow[0].length - 3; i += 1) {
      const date = moment(Number(props.data[0].dates.salesStart))
        .add(i, 'M')
        .format('MMM YY');
      columns.push({ name: date, title: date });
    }
    const helperRows = [
      'Cuotas Iniciales Fiducia',
      'Cuotas Iniciales Disponibles',
      'Entregas',
    ];
    return {
      rows: group.arrayCashFlow.map((row, index) => {
        const tempRow = { type: helperRows[index] };
        row.forEach(
          (value, i) =>
            (tempRow[columns[i + 1].name] = `$${Number(
              value.toFixed(0),
            ).toLocaleString('en-US')}`),
        );
        return tempRow;
      }),
      columns,
      name: group.type,
    };
  });

  const leftColumns = ['type', 'acumulated', 'projected', 'total'];
  const tableColumnExtensions = [{ columnName: 'type', width: 200 }];

  return arrayCashFlowWhitFixed.map((dataTable, i) => (
    <ExpansionPanel key={i}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <span>{dataTable.name}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.AccordionContainer}>
          <Grid rows={dataTable.rows} columns={dataTable.columns}>
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow />
            <TableFixedColumns leftColumns={leftColumns} />
          </Grid>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
};

export default TableCashFlow;
