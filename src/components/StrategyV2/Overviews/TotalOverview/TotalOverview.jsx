import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget, { SM, XS } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';
import Numbers from '../../../../helpers/numbers';

const TotalOverView = () => {
  const { state } = useContext(Context);
  const { selectedGroup, groups } = state;

  const sales =
    groups[selectedGroup].total.l0 + groups[selectedGroup].total.increment;
  const averagePrice = sales / groups[selectedGroup].total.units;

  return (
    <Overview
      title={<Typography variant="h5">Detalle del Total</Typography>}
      subtitle={`${groups[selectedGroup].total.units} Unidades de ${groups[selectedGroup].total.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Total-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {groups[selectedGroup].total.saleSpeed}
        </Widget>,
        <Widget
          key="Total-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(
            groups[selectedGroup].total.units /
              groups[selectedGroup].total.saleSpeed,
          )}
        </Widget>,
        <Widget key="Total-Increment" title="Incremento en pesos" size={SM}>
          <NumberFormat
            value={groups[selectedGroup].total.increment}
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
              size={XS}
            >
              {Numbers.toFixed(groups[selectedGroup].total.EARate * 100)}%
            </Widget>,
            <Widget
              key="Total-IncrementPercentage"
              title="% Lista de incremento"
              size={XS}
            >
              {Numbers.toFixed(groups[selectedGroup].total.incrementRate * 100)}
              %
            </Widget>,
          ]}
        />,
      ]}
      priceWidgets={[
        <Widget key="Total-Sales" title="Ventas" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(sales)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-AverageSales" title="Precio promedio" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(averagePrice)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-M2Price" title="Valor m²" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(
              averagePrice / groups[selectedGroup].total.averageArea,
            )}
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
