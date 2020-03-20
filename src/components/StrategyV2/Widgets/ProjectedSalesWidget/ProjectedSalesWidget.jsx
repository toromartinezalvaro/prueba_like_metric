import React from 'react';
import NumberFormat from 'react-number-format';
import Widget from '../Widget';
import WidgetGroup from '../WidgetGroup';

const ProjectedSalesWidget = () => {
  return (
    <WidgetGroup
      widgets={[
        <Widget
          key="projectedSalesWithIncrement"
          title="Ventas Proyectadas"
          subtitle="Con incrementos"
          size="sm"
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
