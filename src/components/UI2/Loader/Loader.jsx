import React from 'react';
import PropsTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const Loader = ({ isLoading, children, variant }) => {
  const Progress = CircularProgress;
  return isLoading ? (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Progress />
      </Grid>
    </Grid>
  ) : (
    children
  );
};

Loader.propTypes = {
  isLoading: PropsTypes.bool,
  variant: PropsTypes.oneOf(['linear', 'circular']),
  children: PropsTypes.node.isRequired,
};

Loader.defaultProps = {
  isLoading: false,
  variant: 'circular',
};

export default Loader;
