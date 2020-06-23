import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import WidgetGroup from '../../Shared/WidgetGroup';
import { changeView } from '../actions';
import { MAIN_VIEW, DETAILS_VIEW } from '../reducer';
import Numbers from '../../../../helpers/numbers';
import SaleSpeed from './InfoWidgets/SaleSpeed';
import InventoryRotation from './InfoWidgets/InventoryRotation';
import TotalIncrement from './InfoWidgets/TotalIncrement';
import EARateWidget from './InfoWidgets/EARate';
import InitialFee from './InfoWidgets/InitialFee';
import Sales from './PriceWidgets/Sales';
import AveragePrice from './PriceWidgets/AveragePrice';
import PricePerM2 from './PriceWidgets/PricePerM2';
import PriceDetailsGroup from './PriceWidgets/DetailsGroup';
import EARate from './InfoWidgets/EARate';
import { openSalesSpeedDialog } from './SalesSpeedModal/actions';
import { Type } from '../../Shared/Widget';

const mainInfoWidgets = [
  <SaleSpeed key={uuidV4()} />,
  <InventoryRotation key={uuidV4()} />,
  <TotalIncrement key={uuidV4()} />,
  <EARateWidget key={uuidV4()} />,
];

const detailWidget = [
  <WidgetGroup
    showGroup
    widgets={[
      <SaleSpeed type={Type.real} key={uuidV4()} />,
      <InventoryRotation type={Type.real} key={uuidV4()} />,
      <EARate type={Type.real} key={uuidV4()} />,
    ]}
    key={uuidV4()}
  />,
  <WidgetGroup
    showGroup
    widgets={[
      <SaleSpeed key={uuidV4()} />,
      <InventoryRotation key={uuidV4()} />,
      <EARate key={uuidV4()} />,
    ]}
    key={uuidV4()}
  />,
  <InitialFee key={uuidV4()} />,
];

const mainPriceWidgets = [
  <Sales key={uuidV4()} projected />,
  <AveragePrice key={uuidV4()} projected />,
  <PricePerM2 key={uuidV4()} projected />,
];

const detailsPriceWidgets = [<PriceDetailsGroup key={uuidV4()} />];

const InventoryOverview = ({
  units,
  averageArea,
  strategy,
  view,
  onViewChange,
  openHandler,
}) => {
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
      subtitle={`${units} Unidades de ${Numbers.toFixed(
        averageArea,
      )}m² Promedio`}
      infoWidgets={
        view === MAIN_VIEW
          ? mainInfoWidgets
          : [
              ...detailWidget,
              <Button
                key={uuidV4()}
                onClick={openHandler}
                size="large"
                variant="contained"
                fullWidth
                disableElevation
                color={'primary'}
              >
                Velocidad de ventas
              </Button>,
            ]
      }
      priceWidgets={view === MAIN_VIEW ? mainPriceWidgets : detailsPriceWidgets}
    />
  );
};

InventoryOverview.propTypes = {
  units: PropTypes.number.isRequired,
  averageArea: PropTypes.number.isRequired,
  strategy: PropTypes.number.isRequired,
  view: PropTypes.oneOf([MAIN_VIEW, DETAILS_VIEW]),
  onViewChange: PropTypes.func.isRequired,
  onOpenSalesSpeed: PropTypes.func.isRequired,
  openHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory, strategy } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    units: inventory.units,
    averageArea: inventory.averageArea,
    strategy,
    view: state.strategy.overviews.view,
  };
};

const mapDispatchToProps = {
  onViewChange: changeView,
  openHandler: openSalesSpeedDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryOverview);
