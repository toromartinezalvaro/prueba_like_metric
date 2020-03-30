import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget, { SM, XS } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Numbers from '../../../../helpers/numbers';

const TotalOverView = ({
  l0,
  increment,
  units,
  averageArea,
  saleSpeed,
  EARate,
  incrementRate,
}) => {
  const sales = l0 + increment;
  const averagePrice = sales / units;

  return (
    <Overview
      title={<Typography variant="h5">Detalle del Total</Typography>}
      subtitle={`${units} Unidades de ${averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Total-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {saleSpeed}
        </Widget>,
        <Widget
          key="Total-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(units / saleSpeed)}
        </Widget>,
        <Widget key="Total-Increment" title="Incremento en pesos" size={SM}>
          <NumberFormat
            value={increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <WidgetGroup
          key="Total-IncrementRates"
          showGroup
          widgets={[
            <Widget
              key="Total-AERate"
              title="Tasa de incrementos e.a"
              size={XS}
            >
              {Numbers.toFixed(EARate * 100)}%
            </Widget>,
            <Widget
              key="Total-IncrementPercentage"
              title="% Lista de incremento"
              size={XS}
            >
              {Numbers.toFixed(incrementRate * 100)}%
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
            value={Numbers.toFixed(averagePrice / averageArea)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

TotalOverView.propTypes = {
  l0: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  incrementRate: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { total } = state.strategy.root.groups[
    state.strategy.settings.selectedGroup
  ];
  return {
    l0: total.l0,
    increment: total.increment,
    units: total.units,
    averageArea: total.averageArea,
    saleSpeed: total.saleSpeed,
    EARate: total.EARate,
    incrementRate: total.incrementRate,
  };
};

export default connect(mapStateToProps)(TotalOverView);
