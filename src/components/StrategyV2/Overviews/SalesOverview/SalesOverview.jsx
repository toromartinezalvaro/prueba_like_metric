import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget, { SM } from '../../Shared/Widget';
import Numbers from '../../../../helpers/numbers';

const SalesOverview = ({
  l0,
  increment,
  units,
  averageArea,
  saleSpeed,
  EARate,
}) => {
  const sales = l0 + increment;
  const averagePrice = sales / units;
  return (
    <Overview
      title={<Typography variant="h5">Detalles de lo vendido</Typography>}
      subtitle={`${units} Unidades de ${averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Sales-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {saleSpeed}
        </Widget>,
        <Widget
          key="Sales-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(units / saleSpeed)}
        </Widget>,
        <Widget key="Sales-Increment" title="Incremento en pesos" size={SM}>
          <NumberFormat
            value={increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-EARate" title="Tasa de incremento e.a" size={SM}>
          {Numbers.toFixed(EARate * 100)}%
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="Sales-Sales" title="Ventas" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(sales)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-AverageSales" title="Precio promedio" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(averagePrice)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-M2Price" title="Valor m²" size={SM}>
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

SalesOverview.propTypes = {
  l0: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { sales } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    l0: sales.l0,
    increment: sales.increment,
    units: sales.units,
    averageArea: sales.averageArea,
    saleSpeed: sales.saleSpeed,
    EARate: sales.EARate,
  };
};
export default connect(mapStateToProps)(SalesOverview);
