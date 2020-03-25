import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Overview = ({
  title,
  titleButton,
  onClick,
  subtitle,
  infoWidgets,
  priceWidgets,
}) => {
  return (
    <div>
      <Box mb={3}>
        {titleButton ? (
          <Button
            onClick={onClick}
            size="large"
            variant="contained"
            fullWidth
            disableElevation
            color="primary"
          >
            {title}
          </Button>
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}

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
  titleButton: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string.isRequired,
  infoWidgets: PropTypes.array.isRequired,
  priceWidgets: PropTypes.array.isRequired,
};

Overview.defaultProps = {
  titleButton: false,
  onClick: () => {},
};

export default Overview;
