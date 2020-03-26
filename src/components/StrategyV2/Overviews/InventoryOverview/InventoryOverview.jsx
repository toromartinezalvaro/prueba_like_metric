import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';
import { changeView } from '../../../../containers/StrategyV2/actions';
import {
  MAIN_VIEW,
  DETAILS_VIEW,
} from '../../../../containers/StrategyV2/reducer';

const InventoryOverview = () => {
  const { state, dispatch } = useContext(Context);

  const changeViewHandler = () => {
    if (state.view === MAIN_VIEW) {
      dispatch(changeView(DETAILS_VIEW));
    } else if (state.view === DETAILS_VIEW) {
      dispatch(changeView(MAIN_VIEW));
    }
  };

  return (
    <Overview
      title={
        <Tooltip title="Estrategia seleccionada" arrow>
          <Button
            onClick={changeViewHandler}
            size="large"
            variant="contained"
            fullWidth
            disableElevation
            color="primary"
          >
            Detalles del Inventario
          </Button>
        </Tooltip>
      }
      subtitle={`${state.data.inventory.units} Unidades de ${state.data.inventory.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="DetailInv-SaleSpeed" title="Velocidad de ventas" size="sm">
          {state.data.inventory.saleSpeed}
        </Widget>,
        <Widget
          key="DetailInv-InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          {state.data.inventory.inventoryRotation}
        </Widget>,
        <WidgetGroup
          key="DetailInv-IncrementRates"
          widgets={[
            <Widget
              key="DetailInv-appliedIncrement"
              title="Incremento aplicado en Inv"
              size="xs"
            >
              <NumberFormat
                value={state.data.inventory.appliedIncrement}
                displayType="text"
                prefix="$"
                thousandSeparator
              />
            </Widget>,
            <Widget
              key="DetailInv-ProjectedIncrement"
              title="Incremento proyectado"
              size="xs"
            >
              <NumberFormat
                value={state.data.inventory.projectedIncrement}
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
          size="sm"
        >
          {state.data.inventory.EARate * 100}%
        </Widget>,
      ]}
      priceWidgets={[
        <Widget
          key="DetailInv-IncrementRate"
          title="Velocidad de ventas"
          size="sm"
        >
          PD
        </Widget>,
        <Widget
          key="DetailInv-IncrementRate"
          title="Velocidad de ventas"
          size="sm"
        >
          PD
        </Widget>,
        <Widget
          key="DetailInv-IncrementRate"
          title="Velocidad de ventas"
          size="sm"
        >
          PD
        </Widget>,
      ]}
    />
  );
};

export default InventoryOverview;
