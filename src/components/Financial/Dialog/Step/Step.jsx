import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const Step = ({ title, children }) => {
  return (
    <Paper variant="outlined">
      <Box p={2}>{title}</Box>
      <Divider />
      <Box p={2}>{children}</Box>
    </Paper>
  );
};

Step.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Step;
