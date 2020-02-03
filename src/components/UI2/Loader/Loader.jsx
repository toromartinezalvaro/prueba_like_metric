import React from 'react';
import PropsTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const Loader = ({ isLoading, children }) => {
  return isLoading ? <LinearProgress /> : children;
};

Loader.propTypes = {
  isLoading: PropsTypes.bool,
  children: PropsTypes.node.isRequired,
};

Loader.defaultProps = {
  isLoading: false,
};

export default Loader;
