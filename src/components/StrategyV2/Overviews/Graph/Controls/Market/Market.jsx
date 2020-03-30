import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input, { CURRENCY, PERCENTAGE } from './Input';
import Numbers from '../../../../../../helpers/numbers';
import {
  changeMarketAveragePrice,
  changeMarketEARate,
} from '../../../../../../containers/StrategyV2/actions';

const Market = ({
  averagePrice,
  EARate,
  onChangeMarketAveragePrice,
  onChangeMarketEARate,
}) => {
  const averagePriceChangeHandler = (event) => {
    onChangeMarketAveragePrice(event.target.value);
  };

  const EARateChangeHandler = (event) => {
    onChangeMarketEARate(event.target.value);
  };

  return (
    <Paper>
      <Box p={3}>
        <Box mb={2}>
          <Typography variant="h5">Mercado</Typography>
        </Box>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12}>
            <Input
              label="Precio promedio"
              placeholder="$5000000"
              fullWidth
              variant="outlined"
              value={averagePrice}
              onChange={averagePriceChangeHandler}
              mask={CURRENCY}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="E.A."
              placeholder="13.7%"
              variant="outlined"
              fullWidth
              value={Numbers.toFixed(EARate * 100)}
              onChange={EARateChangeHandler}
              mask={PERCENTAGE}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

Market.propTypes = {
  averagePrice: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  onChangeMarketAveragePrice: PropTypes.func.isRequired,
  onChangeMarketEARate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { market } = state.strategy.root.groups[
    state.strategy.settings.selectedGroup
  ];
  return { averagePrice: market.averagePrice, EARate: market.EARate };
};

const mapDispatchToProps = {
  onChangeMarketAveragePrice: changeMarketAveragePrice,
  onChangeMarketEARate: changeMarketEARate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Market);
