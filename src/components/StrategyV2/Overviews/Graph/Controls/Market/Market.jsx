import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import AveragePrice from './AveragePrice';
import EARate from './EARate';
import validateSelectedGroup from '../../../../Shared/Validator';

const Market = ({ units }) => {
  return (
    <>
      {units > 1 ? (
        <Paper>
          <Box p={3}>
            <Box mb={2}>
              <Typography variant="h5">Mercado</Typography>
            </Box>
            <Grid container spacing={2} direction="row">
              <Grid item xs={12}>
                <AveragePrice />
              </Grid>
              <Grid item xs={12}>
                <EARate />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      ) : null}
    </>
  );
};
Market.propTypes = {
  units: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  if (validateSelectedGroup(state.strategy.root)) {
    return {};
  }
  const { inventory } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];

  return { units: inventory.units };
};

export default connect(mapStateToProps)(Market);
