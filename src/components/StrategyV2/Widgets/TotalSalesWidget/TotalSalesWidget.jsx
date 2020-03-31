import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const TotalSalesWidget = ({ l0, increment, showPricesWithoutIncrement }) => {
  return (
    <WidgetGroup
      showGroup={showPricesWithoutIncrement}
      widgets={[
        <Widget
          key={uuidV4()}
          title="Ventas Totales"
          subtitle="Con incrementos"
          size={showPricesWithoutIncrement ? SM : MD}
        >
          <NumberFormat
            value={l0 + increment}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key={uuidV4()}
          title="Ventas Totales"
          subtitle="Sin incrementos"
          size={SM}
        >
          <NumberFormat
            value={l0}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

TotalSalesWidget.propTypes = {
  l0: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const group = state.strategy.root.groups[state.strategy.root.selectedGroup];
  return {
    l0: group.total.l0,
    increment: group.total.increment,
    showPricesWithoutIncrement:
      state.strategy.settings.showPricesWithoutIncrement,
  };
};

export default connect(mapStateToProps)(TotalSalesWidget);
