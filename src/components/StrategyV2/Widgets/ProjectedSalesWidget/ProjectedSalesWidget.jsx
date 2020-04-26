import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const ProjectedSalesWidget = ({
  salesWhitoutIncrements,
  salesProjected,
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
            value={Math.round(salesProjected)}
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
            value={Math.round(salesWhitoutIncrements)}
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
  salesProjected: PropTypes.number.isRequired,
  salesWhitoutIncrements: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    salesProjected: inventory.salesProjected,
    salesWhitoutIncrements: inventory.salesWhitoutIncrements,
    showPricesWithoutIncrement:
      state.strategy.settings.showPricesWithoutIncrement,
  };
};

export default connect(mapStateToProps)(ProjectedSalesWidget);
