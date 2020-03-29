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

const InventoryOverview = ({ groups, selectedGroup, view, onViewChange }) => {
  const units =
    groups[selectedGroup].total.units - groups[selectedGroup].sales.units;
  const { sales } = groups[selectedGroup].inventory;
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

InventoryOverview.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.shape({
        units: PropTypes.number,
      }),
      sales: PropTypes.shape({
        units: PropTypes.number,
      }),
      inventory: PropTypes.shape({
        averageArea: PropTypes.number,
        saleSpeed: PropTypes.number,
        sales: PropTypes.number,
        appliedIncrement: PropTypes.number,
        projectedIncrement: PropTypes.number,
        EARate: PropTypes.number,
      }),
      strategy: PropTypes.number,
    }),
  ).isRequired,
  selectedGroup: PropTypes.number.isRequired,
  view: PropTypes.oneOf([MAIN_VIEW, DETAILS_VIEW]),
  onViewChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.strategy.root.groups,
  selectedGroup: state.strategy.settings.selectedGroup,
  view: state.strategy.overviews.view,
});

const mapDispatchToProps = {
  onViewChange: changeView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryOverview);
