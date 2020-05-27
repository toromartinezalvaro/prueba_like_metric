/*
 * Created Date: Wednesday May 27th 2020
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 27th May 2020 11:56:00 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
  TreeDataState,
  RowDetailState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';

import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './styles.module.scss';

const getChildRows = (row, rootRows) => (row ? row.childs : rootRows);

const ConsolidatedSalesReport = ({ pricesReportData, unitsReportData }) => {
  const priceRows = pricesReportData;
  const unitsRows = unitsReportData;

  console.log(pricesReportData);
  const priceColumns = [
    { name: 'pesos', title: 'PESOS' },
    { name: 'toCut', title: 'Al Corte' },
    { name: 'inventory', title: 'Inventario' },
    { name: 'total', title: 'Total Ventas' },
  ];
  const unitsColumns = [
    { name: 'pesos', title: 'UNIDADES' },
    { name: 'toCut', title: 'Al Corte' },
    { name: 'inventory', title: 'Inventario' },
    { name: 'total', title: 'Total Ventas' },
  ];

  return (
    <Card>
      <CardHeader>
        <span>Reporte consolidado de ventas</span>
      </CardHeader>
      <CardBody>
        <div className={styles.grid}>
          <Grid rows={priceRows} columns={priceColumns}>
            <TreeDataState />
            <CustomTreeData getChildRows={getChildRows} />
            <Table />
            <TableHeaderRow />
            <TableTreeColumn for="pesos" />
          </Grid>
        </div>
        <Grid rows={unitsRows} columns={unitsColumns}>
          <TreeDataState />
          <CustomTreeData getChildRows={getChildRows} />
          <Table />
          <TableHeaderRow />
          <TableTreeColumn for="pesos" />
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ConsolidatedSalesReport;
