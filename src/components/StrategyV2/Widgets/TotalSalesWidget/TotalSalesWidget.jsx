import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Numbers from '../../../../helpers/numbers';

const TotalSalesWidget = ({
  salesWhitoutIncrements,
  sales,
  showPricesWithoutIncrement,
}) => {
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
            value={Numbers.toFixed(sales)}
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
            value={Numbers.toFixed(salesWhitoutIncrements)}
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
  salesWhitoutIncrements: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
  showPricesWithoutIncrement: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { total } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return {
    salesWhitoutIncrements: total.salesWhitoutIncrements,
    sales: total.sales,
    showPricesWithoutIncrement:
      state.strategy.settings.showPricesWithoutIncrement,
  };
};

export default connect(mapStateToProps)(TotalSalesWidget);
