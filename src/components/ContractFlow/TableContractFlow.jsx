/*
 * Created by Jcatman on Fri Dec 20 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Table from '../UI/Table/Table';
import Numbers from '../../helpers/numbers';
import styles from './TableContractFlow.module.scss';

const TableContractFlow = ({ data }) => {
  const arrayWithTheInformation = data.map((response) => {
    const initialDate = [];
    const finalDate = [];

    const header = [
      <div key="Total" className={styles.HeaderCell}>
        Total
      </div>,
    ];

    for (let i = 0; i < data.length; i += 1) {
      header.push(
        moment(Number(response.schedulesDate.salesStartDate))
          .add(i, 'M')
          .format('MMM YY'),
      );
    }

    initialDate.push(
      moment(Number(response.schedulesDate.salesStartDate)).format(
        'DD/MM/YYYY',
      ),
    );
    finalDate.push(
      moment(Number(response.schedulesDate.endOfSalesDate)).format(
        'DD/MM/YYYY',
      ),
    );

    return {
      cells: response.contract.billings.map((row) =>
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
      name: response.contract.title,
      columns: [response.contract.title],
      initialDate,
      finalDate,
    };
  });

  return arrayWithTheInformation.map((dataTable, i) => (
    <div key={i} className={styles.AccordionContainer}>
      <div className={styles.dates}>
        <div className={styles.initialDate}>
          <h4>Fecha inicio:</h4>
          <span className={styles.date}>{dataTable.initialDate}</span>
        </div>
        <div className={styles.finalDate}>
          <h4>Fecha final:</h4>
          <span className={styles.date}>{dataTable.finalDate}</span>
        </div>
      </div>
      <Table
        intersect={''}
        headers={dataTable.header}
        columnsMinWidth={true}
        columns={dataTable.columns}
        data={dataTable.cells}
        maxHeight={{ maxHeight: '36vh' }}
      />
    </div>
  ));
};

export default TableContractFlow;
