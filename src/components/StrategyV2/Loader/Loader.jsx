import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Styles from './Loader.module.scss';

const Loader = ({ loading }) => {
  return (
    <Fade in={loading}>
      <Backdrop classes={{ root: Styles.backdrop }}>
        <Box
          position="fixed"
          top="50vh"
          left="50vw"
          className={Styles.container}
        >
          <Paper>
            <Box py={3} px={2} textAlign="center">
              <Box mb={1}>
                <Typography>Recalculando datos</Typography>
              </Box>
              <CircularProgress />
            </Box>
          </Paper>
        </Box>
      </Backdrop>
    </Fade>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.strategy.api.loading,
});

export default connect(mapStateToProps)(Loader);
