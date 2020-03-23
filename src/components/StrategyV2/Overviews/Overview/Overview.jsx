import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Overview = ({ title, subtitle, infoWidgets, priceWidgets }) => {
  return (
    <div>
      <Box mb={3}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Box>

      <Box mb={3}>
        <Grid container spacing={2}>
          {infoWidgets.map((infoWidget) => (
            <Grid key={uuidv4()} item md={6}>
              {infoWidget}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Grid container direction="column" spacing={2}>
          {priceWidgets.map((priceWidget) => (
            <Grid key={uuidv4()} item>
              {priceWidget}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  infoWidgets: PropTypes.array.isRequired,
  priceWidgets: PropTypes.array.isRequired,
};

export default Overview;
