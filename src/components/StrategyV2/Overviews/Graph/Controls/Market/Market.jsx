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
import IncrementsServices from '../../../../../../services/increments/IncrementsServices';

const Market = ({
  id,
  averagePrice,
  EARate,
  onChangeMarketAveragePrice,
  onChangeMarketEARate,
}) => {
  const service = new IncrementsServices();

  const averagePriceChangeHandler = (event) => {
    onChangeMarketAveragePrice(event.target.value);
  };
  const putAveragePrice = (event) => {
    service.putMarketAveragePrice(id, {
      averagePrice: event.target.value.substring(1),
      length: 0,
    });
  };

  const EARateChangeHandler = (event) => {
    onChangeMarketEARate(event.target.value);
  };

  const putEArate = (event) => {
    service.putMarketAnualEffectiveIncrement(id, {
      anualEffectiveIncrement: event.target.value.substring(
        0,
        event.target.value.length - 1,
      ),
      length: 0,
    });
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
              onBlur={putAveragePrice}
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
              onBlur={putEArate}
              mask={PERCENTAGE}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

Market.propTypes = {
  id: PropTypes.number.isRequired,
  averagePrice: PropTypes.number.isRequired,
  EARate: PropTypes.number.isRequired,
  onChangeMarketAveragePrice: PropTypes.func.isRequired,
  onChangeMarketEARate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { market, id } = state.strategy.root.groups[
    state.strategy.root.selectedGroup
  ];
  return { averagePrice: market.averagePrice, EARate: market.EARate, id };
};

const mapDispatchToProps = {
  onChangeMarketAveragePrice: changeMarketAveragePrice,
  onChangeMarketEARate: changeMarketEARate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Market);
