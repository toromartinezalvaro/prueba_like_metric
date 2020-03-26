import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import Widget from '../../Shared/Widget';
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
      subtitle="5 Unidades de 4m² Promedio"
      infoWidgets={[
        <Widget key="DetailInv-SaleSpeed" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget
          key="DetailInv-InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          10
        </Widget>,
        <Widget key="DetailInv-Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={46.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key="DetailInv-IncrementRate"
          title="Velocidad de ventas"
          size="sm"
        >
          PD
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
