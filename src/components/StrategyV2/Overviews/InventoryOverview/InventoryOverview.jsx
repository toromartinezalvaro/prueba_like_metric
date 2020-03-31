import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import Widget, { SM } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import { changeView } from '../actions';
import { MAIN_VIEW, DETAILS_VIEW } from '../reducer';
import Numbers from '../../../../helpers/numbers';
import SaleSpeed from './InfoWidgets/SaleSpeed';
import InventoryRotation from './InfoWidgets/InventoryRotation';
import AppliedIncrement from './InfoWidgets/AppliedIncrement';
import ProjectedIncrement from './InfoWidgets/ProjectedIncrement';
import EARateWidget from './InfoWidgets/EARate';
import InitialFee from './InfoWidgets/InitialFee';

const mainInfoWidgets = [
  <SaleSpeed key={uuidV4()} />,
  <InventoryRotation key={uuidV4()} />,
  <WidgetGroup
    showGroup
    widgets={[
      <AppliedIncrement key={uuidV4()} />,
      <ProjectedIncrement mini key={uuidV4()} />,
    ]}
    key={uuidV4()}
  />,
  <EARateWidget key={uuidV4()} />,
];

const detailWidget = [
  <SaleSpeed field key={uuidV4()} />,
  <WidgetGroup
    showGroup
    widgets={[
      <InventoryRotation mini key={uuidV4()} />,
      <InitialFee key={uuidV4()} />,
    ]}
    key={uuidV4()}
  />,
  <ProjectedIncrement field key={uuidV4()} />,
  <EARateWidget key={uuidV4()} />,
];

const mainPriceWidgets = [];

const InventoryOverview = ({
  totalUnits,
  salesUnits,
  averageArea,
  sales,
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
      infoWidgets={view === MAIN_VIEW ? mainInfoWidgets : detailWidget}
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
  strategy: PropTypes.number.isRequired,
  view: PropTypes.oneOf([MAIN_VIEW, DETAILS_VIEW]),
  onViewChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory, strategy } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
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
