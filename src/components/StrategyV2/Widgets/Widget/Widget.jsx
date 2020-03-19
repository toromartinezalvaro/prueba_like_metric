import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Widget = ({ title, value }) => {
  return (
    <Paper>
      <Box pt={3} px={3}>
        <Typography variant="h4" component="div" align="center">
          {value}
        </Typography>
      </Box>
      <Box pb={3} px={3}>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Widget;
