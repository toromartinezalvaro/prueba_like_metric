import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import Widget, { XS, SM } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import { changeView } from '../actions';
import { MAIN_VIEW, DETAILS_VIEW } from '../reducer';
import Numbers from '../../../../helpers/numbers';

const InventoryOverview = ({
  totalUnits,
  salesUnits,
  averageArea,
  saleSpeed,
  sales,
  appliedIncrement,
  projectedIncrement,
  EARate,
  strategy,
  view,
  onViewChange,
}) => {
  const units = totalUnits - salesUnits;
  const averagePrice = sales / units;

  const changeViewHandler = () => {
    if (view === MAIN_VIEW) {
      onViewChange(DETAILS_VIEW);
    } else if (view === DETAILS_VIEW) {
      onViewChange(MAIN_VIEW);
    }
  };

  return (
    <Overview
      title={
        <Tooltip
          title={
            strategy === null
              ? 'NO hay una estrategia'
              : 'Estrategia seleccionada'
          }
          arrow
        >
          <Button
            onClick={changeViewHandler}
            size="large"
            variant="contained"
            fullWidth
            disableElevation
            color={strategy === null ? 'secondary' : 'primary'}
          >
            Detalles del Inventario
          </Button>
        </Tooltip>
      }
      subtitle={`${units} Unidades de ${averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="DetailInv-SaleSpeed" title="Velocidad de ventas" size="sm">
          {saleSpeed}
        </Widget>,
        <Widget
          key="DetailInv-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(units / saleSpeed)}
        </Widget>,
        <WidgetGroup
          key="DetailInv-IncrementRates"
          showGroup
          widgets={[
            <Widget
              key="DetailInv-appliedIncrement"
              title="Incremento aplicado en Inv"
              size={XS}
            >
              <NumberFormat
                value={Numbers.toFixed(appliedIncrement)}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
            </Widget>,
            <Widget
              key="DetailInv-ProjectedIncrement"
              title="Incremento proyectado"
              size={XS}
            >
              <NumberFormat
                value={Numbers.toFixed(projectedIncrement * 100)}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
            </Widget>,
          ]}
        />,
        <Widget
          key="DetailInv-EARate"
          title="Tasa Incremento e.a Proyectada"
          size={SM}
        >
          {Numbers.toFixed(EARate * 100)}%
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="DetailInv-IncrementRate" title="Ventas" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(sales)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="DetailInv-AverageSales" title="Precio promedio" size={SM}>
          <NumberFormat
            value={Numbers.toFixed(averagePrice)}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="DetailInv-M2Price" title="Valor m²" size={SM}>
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

InventoryOverview.propTypes = {
  totalUnits: PropTypes.number.isRequired,
  salesUnits: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
  appliedIncrement: PropTypes.number.isRequired,
  projectedIncrement: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  strategy: PropTypes.number.isRequired,
  view: PropTypes.oneOf([MAIN_VIEW, DETAILS_VIEW]),
  onViewChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory, strategy } = state.strategy.root.groups[
    state.strategy.settings.selectedGroup
  ];
  return {
    totalUnits: total.units,
    salesUnits: sales.units,
    averageArea: inventory.averageArea,
    saleSpeed: inventory.saleSpeed,
    sales: inventory.sales,
    appliedIncrement: inventory.appliedIncrement,
    projectedIncrement: inventory.projectedIncrement,
    EARate: inventory.EARate,
    strategy,
    view: state.strategy.overviews.view,
  };
};

const mapDispatchToProps = {
  onViewChange: changeView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryOverview);
