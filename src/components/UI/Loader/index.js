/* eslint-disable arrow-body-style */
import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import variables from '../../../assets/styles/variables.scss';
import styles from './Loader.module.scss';

const LoaderSpinner = ({ children, isLoading, type, ...rest }) => {
  return isLoading ? (
    <div className={styles.LoaderContainer}>
      <Loader
        type={type}
        color={variables.mainColor}
        height="100"
        width="100"
        {...rest}
      />
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

LoaderSpinner.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

LoaderSpinner.defaultProps = {
  type: 'Puff',
};

export default LoaderSpinner;
