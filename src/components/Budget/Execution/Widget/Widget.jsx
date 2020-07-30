import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Widget = ({ title, children }) => {
  return (
    <Paper>
      <Box p={3}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography>{title}:</Typography>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Widget;
