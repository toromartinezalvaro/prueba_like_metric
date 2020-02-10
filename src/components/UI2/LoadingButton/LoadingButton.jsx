import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Styles from './LoadingButton.module.scss';

const LoadingButton = ({ loading, disabled, children, ...rest }) => {
  return (
    <div className={Styles.wrapper}>
      <Button disabled={loading || disabled} {...rest}>
        {children}
      </Button>
      {loading && (
        <div className={Styles.buttonProgress}>
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

LoadingButton.defaultProps = {
  loading: false,
  disabled: false,
  children: <></>,
};

export default LoadingButton;
