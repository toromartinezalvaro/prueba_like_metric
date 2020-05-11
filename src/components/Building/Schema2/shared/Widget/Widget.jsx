import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Widget({ title, children }) {
  return (
    <Paper>
      <Box p={3}>
        <Box>
          <Typography
            align="center"
            variant="h2"
            component="span"
            display="block"
          >
            {children}
          </Typography>
        </Box>
        <Box>
          <Typography
            align="center"
            variant="h6"
            component="span"
            display="block"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

Widget.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
