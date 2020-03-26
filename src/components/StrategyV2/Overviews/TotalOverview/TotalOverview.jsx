import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';

const TotalOverView = () => {
  const { state } = useContext(Context);
  return (
    <Overview
      title={<Typography variant="h5">Detalle del Total</Typography>}
      subtitle={`${state.data.total.units} Unidades de ${state.data.total.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Total-SaleSpeed" title="Velocidad de ventas" size="sm">
          {state.data.total.saleSpeed}
        </Widget>,
        <Widget
          key="Total-InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          {state.data.total.inventoryRotation}
        </Widget>,
        <Widget key="Total-Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={state.data.total.increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <WidgetGroup
          key="Total-IncrementRates"
          widgets={[
            <Widget
              key="Total-AERate"
              title="Tasa de incrementos e.a"
              size="xs"
            >
              {state.data.total.EARate}
            </Widget>,
            <Widget
              key="Total-IncrementPercentage"
              title="% Lista de incremento"
              size="xs"
            >
              {state.data.total.EARate}
            </Widget>,
          ]}
        />,
      ]}
      priceWidgets={[
        <Widget key="Total-Sales" title="Ventas" size="sm">
          <NumberFormat
            value={1046.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-AverageSales" title="Precio promedio" size="sm">
          <NumberFormat
            value={104.6}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-M2Price" title="Valor m²" size="sm">
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

export default TotalOverView;
