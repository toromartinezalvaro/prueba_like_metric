import React from 'react';
import NumberFormat from 'react-number-format';
import Widget from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const TotalSalesWidget = () => {
  return (
    <WidgetGroup
      widgets={[
        <Widget
          key="totalSalesWithIncrement"
          title="Ventas Totales"
          subtitle="Con incrementos"
          size="sm"
        >
          <NumberFormat
            value={1056.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key="totalSalesWithoutIncrement"
          title="Ventas Totales"
          subtitle="Sin incrementos"
          size="sm"
        >
          <NumberFormat
            value={1056.2}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

export default TotalSalesWidget;
