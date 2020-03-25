import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
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
      titleButton
      onClick={changeViewHandler}
      title="Detalles del Inventario"
      subtitle="5 Unidades de 4m² Promedio"
      infoWidgets={[
        <Widget key="SaleSpeed" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget
          key="InventoryRotation"
          title="Rotacion de intentario"
          size="sm"
        >
          10
        </Widget>,
        <Widget key="Increment" title="Incremento en pesos" size="sm">
          <NumberFormat
            value={46.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
      ]}
      priceWidgets={[
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
        <Widget key="IncrementRate" title="Velocidad de ventas" size="sm">
          PD
        </Widget>,
      ]}
    />
  );
};

export default InventoryOverview;
