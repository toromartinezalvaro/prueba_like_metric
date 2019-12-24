/*
 * Created by Jcatman on Fri Dec 20 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import moment from 'moment';
import Table from '../UI/Table/Table';
import styles from './TableContractFlow.module.scss';

const TableContractFlow = ({ data }) => {
  const arrayWithTheInformation = data.map((response) => {
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
    return {
      cells: ['dato prueba'],
      header,
      name: ['dato prueba'],
    };
  });

  return arrayWithTheInformation.map((dataTable, i) => (
    <div key={i} className={styles.AccordionContainer}>
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
  ));
};

export default TableContractFlow;
