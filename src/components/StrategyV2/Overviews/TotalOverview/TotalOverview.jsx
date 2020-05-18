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
  increment,
  sales,
  averagePrice,
  rotationMonths,
  pricePerM2,
  units,
  averageArea,
  saleSpeed,
  EARate,
  incrementRate,
}) => {
  return (
    <Overview
      title={<Typography variant="h5">Detalle del Total</Typography>}
      subtitle={`${units} Unidades de ${Numbers.toFixed(
        averageArea,
      )}m² Promedio`}
      infoWidgets={[
        <Widget key="Total-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {saleSpeed}
        </Widget>,
        <Widget
          key="Total-InventoryRotation"
          title="Rotacion de inventario"
          size={SM}
        >
          {rotationMonths}
        </Widget>,
        <Widget key="Total-Increment" title="Incremento total" size={SM}>
          <NumberFormat
            value={Math.round(increment)}
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
            value={Math.round(sales)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-AverageSales" title="Precio promedio" size={SM}>
          <NumberFormat
            value={Math.round(averagePrice)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Total-M2Price" title="Valor m²" size={SM}>
          <NumberFormat
            value={Math.round(pricePerM2)}
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
  increment: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
  averagePrice: PropTypes.number.isRequired,
  rotationMonths: PropTypes.number.isRequired,
  pricePerM2: PropTypes.number.isRequired,
  units: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  incrementRate: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { total } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    increment: total.increment,
    sales: total.sales,
    averagePrice: total.averagePrice,
    rotationMonths: total.rotationMonths,
    pricePerM2: total.pricePerM2,
    units: total.units,
    averageArea: total.averageArea,
    saleSpeed: total.saleSpeed,
    EARate: total.EARate,
    incrementRate: total.incrementRate,
  };
};

export default connect(mapStateToProps)(TotalOverView);
