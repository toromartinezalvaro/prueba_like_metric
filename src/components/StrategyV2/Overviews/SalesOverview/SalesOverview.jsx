import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget, { SM } from '../../Shared/Widget';
import Numbers from '../../../../helpers/numbers';

const SalesOverview = ({
  increment,
  sales,
  averagePrice,
  rotationMonths,
  pricePerM2,
  units,
  averageArea,
  saleSpeed,
  EARate,
}) => {
  return (
    <Overview
      title={<Typography variant="h5">Detalles de lo vendido</Typography>}
      subtitle={`${units} Unidades de ${Numbers.toFixed(
        averageArea,
      )}m² Promedio`}
      infoWidgets={[
        <Widget key="Sales-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {saleSpeed}
        </Widget>,
        <Widget
          key="Sales-InventoryRotation"
          title="Rotacion de inventario"
          size={SM}
        >
          {Numbers.toFixed(rotationMonths)}
        </Widget>,
        <Widget key="Sales-Increment" title="Incremento en pesos" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(increment)}
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
            value={Numbers.toFixed(pricePerM2)}
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
  increment: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
  averagePrice: PropTypes.number.isRequired,
  rotationMonths: PropTypes.number.isRequired,
  pricePerM2: PropTypes.number.isRequired,
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
    increment: sales.increment,
    sales: sales.sales,
    averagePrice: sales.averagePrice,
    rotationMonths: sales.rotationMonths,
    pricePerM2: sales.pricePerM2,
    units: sales.units,
    averageArea: sales.averageArea,
    saleSpeed: sales.saleSpeed,
    EARate: sales.EARate,
  };
};
export default connect(mapStateToProps)(SalesOverview);
