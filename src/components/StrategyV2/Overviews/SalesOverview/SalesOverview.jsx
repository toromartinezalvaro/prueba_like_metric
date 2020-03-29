import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Overview from '../Overview';
import Widget, { SM } from '../../Shared/Widget';
import Numbers from '../../../../helpers/numbers';

const SalesOverview = ({ groups, selectedGroup }) => {
  const sales =
    groups[selectedGroup].sales.l0 + groups[selectedGroup].sales.increment;
  const averagePrice = sales / groups[selectedGroup].sales.units;
  return (
    <Overview
      title={<Typography variant="h5">Detalles de lo vendido</Typography>}
      subtitle={`${groups[selectedGroup].sales.units} Unidades de ${groups[selectedGroup].sales.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="Sales-SaleSpeed" title="Velocidad de ventas" size={SM}>
          {groups[selectedGroup].sales.saleSpeed}
        </Widget>,
        <Widget
          key="Sales-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(
            groups[selectedGroup].sales.units /
              groups[selectedGroup].sales.saleSpeed,
          )}
        </Widget>,
        <Widget key="Sales-Increment" title="Incremento en pesos" size={SM}>
          <NumberFormat
            value={groups[selectedGroup].sales.increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="Sales-EARate" title="Tasa de incremento e.a" size={SM}>
          {Numbers.toFixed(groups[selectedGroup].sales.EARate * 100)}%
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
            value={Numbers.toFixed(
              averagePrice / groups[selectedGroup].sales.averageArea,
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

SalesOverview.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      sales: PropTypes.shape({
        l0: PropTypes.number,
        increment: PropTypes.number,
        units: PropTypes.number,
        averageArea: PropTypes.number,
        saleSpeed: PropTypes.number,
        EARate: PropTypes.number,
      }),
    }),
  ).isRequired,
  selectedGroup: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.strategy.root.groups,
  selectedGroup: state.strategy.settings.selectedGroup,
});

export default connect(mapStateToProps)(SalesOverview);
