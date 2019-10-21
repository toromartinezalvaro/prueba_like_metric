import React from 'react';
import NumberFormat from 'react-number-format';

import Table from '../UI/Table/Table';
import Numbers from '../../helpers/numbers';
import styles from './TableCashFlow.module.scss';

const TableCashFlow = (props) => {
  const arrayCashFlowWhitFixed = props.data.map((group) =>
    group.arrayCashFlow.map((row) => {
      return row.map((value, i) => (
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
      ));
    }),
  );

  console.log(props.data);
  return arrayCashFlowWhitFixed.map((dataTable, i) => (
    <Table
      key={i}
      intersect={'Areas'}
      headers={['Precio']}
      columns={[
        'Cuotas Iniciales Fiducia',
        'Cuotas Iniciales Disponibles',
        'Entregas',
      ]}
      data={dataTable}
      maxHeight={{ maxHeight: '36vh' }}
    />
  ));
};

export default TableCashFlow;
