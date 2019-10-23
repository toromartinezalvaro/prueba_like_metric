import React from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Accordion from '../UI/Accordion/Accordion';
import Table from '../UI/Table/Table';
import Numbers from '../../helpers/numbers';
import styles from './TableCashFlow.module.scss';

const TableCashFlow = (props) => {
  const arrayCashFlowWhitFixed = props.data.map((group) => {
    const header = ['Acumulado', 'Proyectado', 'Total'];
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
          <div className={styles.Cell} key={styles.Cell + i}>
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
    <Accordion key={i} trigger={<span>{dataTable.name}</span>}>
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
    </Accordion>
  ));
};

export default TableCashFlow;
