import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Widget from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';

const TotalSalesWidget = () => {
  const { state } = useContext(Context);
  return (
    <WidgetGroup
      showGroup={state.settings.prices.withoutIncrements}
      widgets={[
        <Widget
          key="totalSalesWithIncrement"
          title="Ventas Totales"
          subtitle="Con incrementos"
          size={state.settings.prices.withoutIncrements ? 'md' : 'sm'}
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
