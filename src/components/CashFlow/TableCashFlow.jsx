import React from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '../UI/Table/Table';
import Numbers from '../../helpers/numbers';
import styles from './TableCashFlow.module.scss';

const TableCashFlow = (props) => {
  const arrayCashFlowWhitFixed = props.data.map((group) => {
    const header = [
      <div key="Acumulado" className={styles.HeaderCell}>
        Acumulado
      </div>,
      <div key="Proyectado" className={styles.HeaderCell}>
        Proyectado
      </div>,
      <div key="Total" className={styles.HeaderCell}>
        Total
      </div>,
    ];
    for (let i = 0; i < group.arrayCashFlow[0].length - 3; i += 1) {
      header.push(
        moment(Number(props.data[0].dates.salesStart))
          .add(i, 'M')
          .format('MMM YY'),
      );
    }
    return {
      cells: group.arrayCashFlow.map((row) =>
        row.map((value, i) => (
          <div
            className={`${styles.Cell} ${i === 2 && styles.CellRigth}`}
            key={styles.Cell + i}
          >
            {
              <NumberFormat
                value={Numbers.toFixed(value)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            }
          </div>
        )),
      ),
      header,
      name: group.type,
    };
  });

  return arrayCashFlowWhitFixed.map((dataTable, i) => (
    <ExpansionPanel key={i}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <span>{dataTable.name}</span>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.AccordionContainer}>
          <Table
            intersect={''}
            headers={dataTable.header}
            columnsMinWidth={true}
            columns={[
              'Cuotas Iniciales Fiducia',
              'Cuotas Iniciales Disponibles',
              'Entregas',
            ]}
            data={dataTable.cells}
            maxHeight={{ maxHeight: '36vh' }}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
};

export default TableCashFlow;
