import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Widget from '../Widget';

const WidgetGroup = ({ widgets, defaultWidgetIndex, showGroup }) => {
  return (
    <Grid container direction="column" alignItems="stretch" spacing={1}>
      {widgets
        .filter((_, index) => index === defaultWidgetIndex || !showGroup)
        .map((widget) => (
          <Grid item key={uuidv4()} xs={12}>
            {widget}
          </Grid>
        ))}
    </Grid>
  );
};

WidgetGroup.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.oneOf([Widget]) }),
  ).isRequired,
  defaultWidgetIndex: PropTypes.number,
  showGroup: PropTypes.bool,
};

WidgetGroup.defaultProps = {
  defaultWidgetIndex: 0,
  showGroup: false,
};

export default WidgetGroup;
