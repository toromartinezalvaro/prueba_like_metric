import React from 'react';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';

const SalesOverview = () => {
  return (
    <Overview
      title={<Typography variant="h5">Detalles del Inventario</Typography>}
      subtitle="5 Unidades de 4m² Promedio"
      infoWidgets={[
        <Widget key="Inventory-SaleSpeed" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget
          key="Inventory-InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          PD
        </Widget>,
        <Widget key="Inventory-Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={46.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Inventory-EARate" title="Tasa de incremento e.a" size="sm">
          PD
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="Inventory-Sales" title="Ventas" size="sm">
          <NumberFormat
            value={1046.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Inventory-AverageSales" title="Precio promedio" size="sm">
          <NumberFormat
            value={104.6}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Inventory-M2Price" title="Valor m²" size="sm">
          <NumberFormat
            value={26.1}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

export default SalesOverview;
