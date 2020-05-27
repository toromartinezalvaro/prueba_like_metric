/*
 * Created Date: Wednesday May 27th 2020
 * Author: Caraham
 * -----
 * Last Modified: Wednesday, 27th May 2020 5:53:14 am
 * Modified By: the developer formerly known as Caraham
 * -----
 * Copyright (c) 2020 Instabuild
 */

import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

import { RowDetailState } from '@devexpress/dx-react-grid';

import Card, { CardHeader, CardBody } from '../../UI/Card/Card';
import styles from './styles.module.scss';

const ConsolidatedSalesReport = ({
  pricesReportData,
  unitsReportData,
  groupsPricesData,
  groupsAdditionalsData,
  groupsUnitsData,
  groupsAdditionalsUnitsData,
}) => {
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
  const groupsColumns = [
    { name: 'group' },
    { name: 'toCut' },
    { name: 'inventory' },
    { name: 'total' },
  ];

  const RowDetailPrices = ({ row }) => {
    if (row.pesos === 'Ventas (Sin Adicionales)') {
      return (
        <div>
          <Grid rows={groupsPricesData} columns={groupsColumns}>
            <Table />
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <Grid rows={groupsAdditionalsData} columns={groupsColumns}>
          <Table />
        </Grid>
      </div>
    );
  };
  const RowDetailUnits = ({ row }) => {
    if (row.pesos === 'Ventas (Sin Adicionales)') {
      return (
        <div>
          <Grid rows={groupsUnitsData} columns={groupsColumns}>
            <Table />
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <Grid rows={groupsAdditionalsUnitsData} columns={groupsColumns}>
          <Table />
        </Grid>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <span>Reporte consolidado de ventas</span>
      </CardHeader>
      <CardBody>
        <div className={styles.grid}>
          <Grid rows={priceRows} columns={priceColumns}>
            <RowDetailState />
            <Table />
            <TableHeaderRow />
            <TableRowDetail contentComponent={RowDetailPrices} />
          </Grid>
        </div>
        <Grid rows={unitsRows} columns={unitsColumns}>
          <RowDetailState />
          <Table />
          <TableHeaderRow />
          <TableRowDetail contentComponent={RowDetailUnits} />
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ConsolidatedSalesReport;
