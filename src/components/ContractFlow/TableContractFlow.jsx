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

    const billingArray = [];
    const dataGrid = () => {
      if (response.contract.billing) {
        response.contract.billing.map((value) => {
          billingArray.push(Number(value.lastBillingDate));
        });
      }
    };

    dataGrid();

    const maximumDate = Math.max(...billingArray);
    const cells = response.contract.billings.map((row, rowIndex) => {
      return row.map((value, cellIndex) => {
        return (
          <NumberFormat
            key={`value-${rowIndex}-${cellIndex}`}
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        );
      });
    });

    const header = [
      <div key="Total" className={styles.HeaderCell}>
        Total
      </div>,
    ];

    for (
      let i = 0;
      i <
      moment(Number(maximumDate)).diff(
        Number(response.schedulesDate.salesStartDate),
        'months',
        true,
      );
      i += 1
    ) {
      header.push(
        moment(Number(response.schedulesDate.salesStartDate))
          .add(i, 'M')
          .format('MMM YYYY'),
      );
    }

    initialDate.push(
      moment(Number(response.schedulesDate.salesStartDate)).format(
        'DD/MM/YYYY',
      ),
    );
    finalDate.push(moment(Number(maximumDate)).format('DD/MM/YYYY'));

    return {
      cells,
      header,
      name: response.contract.billing.map((bill) => {
        const descriptions = [];
        descriptions.push(
          bill.description !== '' ? bill.description : 'Sin descripción',
        );
        return descriptions;
      }),
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
        intersect={dataTable.columns}
        headers={dataTable.header}
        columnsMinWidth={true}
        columns={dataTable.name}
        data={dataTable.cells}
        maxHeight={{ maxHeight: '36vh' }}
      />
    </div>
  ));
};

export default TableContractFlow;
