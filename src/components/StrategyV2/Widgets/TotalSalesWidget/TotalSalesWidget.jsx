import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import NumberFormat from 'react-number-format';
import Widget, { SM, MD } from '../../Shared/Widget';
import WidgetGroup from '../../Shared/WidgetGroup';

const TotalSalesWidget = ({
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
          title="Ventas Totales"
          subtitle="Con incrementos"
          size={showPricesWithoutIncrement ? SM : MD}
        >
          <NumberFormat
            value={
              groups[selectedGroup].total.l0 +
              groups[selectedGroup].total.increment
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
            value={groups[selectedGroup].total.l0}
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
  groups: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.shape({
        l0: PropTypes.number,
        increment: PropTypes.number,
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

export default connect(mapStateToProps)(TotalSalesWidget);
