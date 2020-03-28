import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Overview from '../Overview';
import Widget, { XS, SM } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';
import { changeView } from '../../../../containers/StrategyV2/actions';
import {
  MAIN_VIEW,
  DETAILS_VIEW,
} from '../../../../containers/StrategyV2/reducer';
import Numbers from '../../../../helpers/numbers';

const InventoryOverview = () => {
  const { state, dispatch } = useContext(Context);
  const { selectedGroup, groups } = state;

  const units =
    groups[selectedGroup].total.units - groups[selectedGroup].sales.units;
  const { sales } = groups[selectedGroup].inventory;
  const averagePrice = sales / units;

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
        <Tooltip
          title={
            groups[selectedGroup].strategy === null
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
            color={
              groups[selectedGroup].strategy === null ? 'secondary' : 'primary'
            }
          >
            Detalles del Inventario
          </Button>
        </Tooltip>
      }
      subtitle={`${units} Unidades de ${groups[selectedGroup].inventory.averageArea}m² Promedio`}
      infoWidgets={[
        <Widget key="DetailInv-SaleSpeed" title="Velocidad de ventas" size="sm">
          {groups[selectedGroup].inventory.saleSpeed}
        </Widget>,
        <Widget
          key="DetailInv-InventoryRotation"
          title="Rotacion de intentario"
          size={SM}
        >
          {Numbers.toFixed(units / groups[selectedGroup].inventory.saleSpeed)}
        </Widget>,
        <WidgetGroup
          key="DetailInv-IncrementRates"
          widgets={[
            <Widget
              key="DetailInv-appliedIncrement"
              title="Incremento aplicado en Inv"
              size={XS}
            >
              <NumberFormat
                value={Numbers.toFixed(
                  groups[selectedGroup].inventory.appliedIncrement,
                )}
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
                value={Numbers.toFixed(
                  groups[selectedGroup].inventory.projectedIncrement * 100,
                )}
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
          {Numbers.toFixed(groups[selectedGroup].inventory.EARate * 100)}%
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
            value={Numbers.toFixed(
              averagePrice / groups[selectedGroup].inventory.averageArea,
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

export default InventoryOverview;
