import React from 'react';
import uuidV4 from 'uuid/v4';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Overview = ({ title, subtitle, infoWidgets, priceWidgets }) => {
  return (
    <div>
      <Box mb={3}>
        {title}
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Box>

      <Box mb={3}>
        <Grid container spacing={2}>
          {infoWidgets.map((infoWidget) => {
            let size = 6;
            let component = infoWidget;
            if (infoWidget.hasOwnProperty('fullWidth')) {
              size = 12;
              // eslint-disable-next-line prefer-destructuring
              component = infoWidget.component;
            }
            return (
              <Grid key={uuidV4()} item xs={12} xl={size}>
                {component}
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box>
        <Grid container direction="column" spacing={2}>
          {priceWidgets.map((priceWidget) => (
            <Grid key={uuidV4()} item>
              {priceWidget}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

Overview.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  infoWidgets: PropTypes.array.isRequired,
  priceWidgets: PropTypes.array.isRequired,
};

Overview.defaultProps = {
  titleButton: false,
  onClick: () => {},
};

export default Overview;
