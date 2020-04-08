import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Numbers from '../../../../helpers/numbers';

const ProjectedSalesWidget = ({
  totalIncrement,
  salesIncrement,
  l0,
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
            value={Numbers.toFixed(l0 + totalIncrement - salesIncrement)}
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
            value={Numbers.toFixed(l0)}
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
  l0: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { total, sales, inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    totalIncrement: total.increment,
    salesIncrement: sales.increment,
    l0: inventory.l0,
    showPricesWithoutIncrement:
      state.strategy.settings.showPricesWithoutIncrement,
  };
};

export default connect(mapStateToProps)(ProjectedSalesWidget);
