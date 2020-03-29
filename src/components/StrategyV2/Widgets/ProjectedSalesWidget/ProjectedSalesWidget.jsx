import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const ProjectedSalesWidget = ({
  groups,
  selectedGroup,
  showPricesWithoutIncrement,
}) => {
  return (
    <WidgetGroup
      showGroup={!showPricesWithoutIncrement}
      widgets={[
        <Widget
          key={uuidV4()}
          title="Ventas Proyectadas"
          subtitle="Con incrementos"
          size={showPricesWithoutIncrement ? SM : MD}
        >
          <NumberFormat
            value={
              groups[selectedGroup].inventory.projectedSales +
              groups[selectedGroup].total.increment -
              groups[selectedGroup].sales.increment
            }
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
            value={groups[selectedGroup].inventory.projectedSales}
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
  groups: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.shape({
        increment: PropTypes.number,
      }),
      sales: PropTypes.shape({
        increment: PropTypes.number,
      }),
      inventory: PropTypes.shape({
        increment: PropTypes.number,
        projectedSales: PropTypes.number,
      }),
    }),
  ).isRequired,
  selectedGroup: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.strategy.root.groups,
  selectedGroup: state.strategy.settings.selectedGroup,
  showPricesWithoutIncrement:
    state.strategy.settings.showPricesWithoutIncrement,
});

export default connect(mapStateToProps)(ProjectedSalesWidget);
