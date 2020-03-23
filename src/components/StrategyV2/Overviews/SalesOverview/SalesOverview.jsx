import React from 'react';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';

const SalesOverview = () => {
  return (
    <Overview
      title="Detalles del Inventario"
      subtitle="5 Unidades de 4m² Promedio"
      infoWidgets={[
        <Widget key="SaleSpeed" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget
          key="InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          PD
        </Widget>,
        <Widget key="Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={46.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
      ]}
    />
  );
};

export default SalesOverview;
