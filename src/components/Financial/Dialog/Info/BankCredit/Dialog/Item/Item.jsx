import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Item = ({ left, right, noDivider }) => {
  return (
    <>
      <Box p={2}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>{left}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{right}</Typography>
          </Grid>
        </Grid>
      </Box>
      {!noDivider && <Divider />}
    </>
  );
};

Item.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  noDivider: PropTypes.bool,
};

Item.defaultProps = {
  noDivider: false,
};

export default Item;
