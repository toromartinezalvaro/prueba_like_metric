import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Units = ({ units, accumulated }) => {
  return (
    <Box my={3}>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Typography>Unidades totales: {units}</Typography>
        </Grid>
        <Grid item lg={6}>
          <Typography>Unidades asignadas: {accumulated}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

Units.propTypes = {
  units: PropTypes.number.isRequired,
  accumulated: PropTypes.number.isRequired,
};

export default Units;
