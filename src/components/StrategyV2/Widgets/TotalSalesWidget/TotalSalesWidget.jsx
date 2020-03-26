import React, { useContext } from 'react';
import uuidv4 from 'uuid/v4';
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
          key={uuidv4()}
          title="Ventas Totales"
          subtitle="Con incrementos"
          size={state.settings.prices.withoutIncrements ? 'md' : 'sm'}
        >
          <NumberFormat
            value={state.data.total.sales.withIncrement}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key={uuidv4()}
          title="Ventas Totales"
          subtitle="Sin incrementos"
          size="sm"
        >
          <NumberFormat
            value={state.data.total.sales.withoutIncrement}
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
