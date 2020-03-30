import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const ProjectedSalesWidget = ({
  totalIncrement,
  salesIncrement,
  inventoryProjectedSales,
  showPricesWithoutIncrement,
}) => {
  return (
    <WidgetGroup
      showGroup={showPricesWithoutIncrement}
      widgets={[
        <Widget
          key={uuidV4()}
          title="Ventas Proyectadas"
          subtitle="Con incrementos"
          size={showPricesWithoutIncrement ? SM : MD}
        >
          <NumberFormat
            value={inventoryProjectedSales + totalIncrement - salesIncrement}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key={uuidV4()}
          title="Ventas Proyectadas"
          subtitle="Sin incrementos"
          size={SM}
        >
          <NumberFormat
            value={inventoryProjectedSales}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

ProjectedSalesWidget.propTypes = {
  totalIncrement: PropTypes.number.isRequired,
  salesIncrement: PropTypes.number.isRequired,
  inventoryProjectedSales: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.settings.selectedGroup
  ];
  return {
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    inventoryProjectedSales: inventory.projectedSales,
    showPricesWithoutIncrement:
      state.strategy.settings.showPricesWithoutIncrement,
  };
};

export default connect(mapStateToProps)(ProjectedSalesWidget);
