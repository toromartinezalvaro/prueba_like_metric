import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';
import Context from '../../../../containers/StrategyV2/context';

const SalesOverview = () => {
  const { state } = useContext(Context);

  return (
    <Overview
      title={<Typography variant="h5">Detalles de lo vendido</Typography>}
      subtitle={`${state.data.sales.units} Unidades de ${state.data.sales.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Sales-SaleSpeed" title="Velocidad de ventas" size="sm">
          {state.data.sales.saleSpeed}
        </Widget>,
        <Widget
          key="Sales-InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          {state.data.sales.inventoryRotation}
        </Widget>,
        <Widget key="Sales-Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={state.data.sales.increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-EARate" title="Tasa de incremento e.a" size="sm">
          {state.data.sales.EARate}
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="Sales-Sales" title="Ventas" size="sm">
          <NumberFormat
            value={state.data.sales.sales}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-AverageSales" title="Precio promedio" size="sm">
          <NumberFormat
            value={state.data.sales.averagePrice}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-M2Price" title="Valor m²" size="sm">
          <NumberFormat
            value={state.data.sales.M2Price}
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
