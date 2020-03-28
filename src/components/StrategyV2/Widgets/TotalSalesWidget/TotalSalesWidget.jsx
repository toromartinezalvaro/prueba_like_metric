import React, { useContext } from 'react';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';

const TotalSalesWidget = () => {
  const { state } = useContext(Context);
  const { selectedGroup } = state;
  return (
    <WidgetGroup
      showGroup={state.settings.prices.withoutIncrements}
      widgets={[
        <Widget
          key={uuidV4()}
          title="Ventas Totales"
          subtitle="Con incrementos"
          size={state.settings.prices.withoutIncrements ? MD : SM}
        >
          <NumberFormat
            value={
              state.groups[selectedGroup].total.l0 +
              state.groups[selectedGroup].total.increment
            }
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
            value={state.groups[selectedGroup].total.l0}
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
