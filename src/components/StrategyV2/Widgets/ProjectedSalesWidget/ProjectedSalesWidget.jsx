import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import Widget from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';
import Context from '../../../../containers/StrategyV2/context';

const ProjectedSalesWidget = () => {
  const { state } = useContext(Context);
  return (
    <WidgetGroup
      showGroup={state.settings.prices.withoutIncrements}
      widgets={[
        <Widget
          showGroup={state.settings.prices.withoutIncrements}
          key="projectedSalesWithIncrement"
          title="Ventas Proyectadas"
          subtitle="Con incrementos"
          size={state.settings.prices.withoutIncrements ? 'md' : 'sm'}
        >
          <NumberFormat
            value={536.1}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
        <Widget
          key="projectedSalesWithoutIncrement"
          title="Ventas Proyectadas"
          subtitle="Sin incrementos"
          size="sm"
        >
          <NumberFormat
            value={500}
            displayType="text"
            prefix="$"
            thousandSeparator
          />
        </Widget>,
      ]}
    />
  );
};

export default ProjectedSalesWidget;
