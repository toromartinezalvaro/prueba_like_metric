import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  changeMarketAveragePrice,
  changeMarketEARate,
} from '../../../../../../containers/StrategyV2/actions';
import Context from '../../../../../../containers/StrategyV2/context';
import Input, { CURRENCY, PERCENTAGE } from './Input';
import Numbers from '../../../../../../helpers/numbers';

const Market = () => {
  const { state, dispatch } = useContext(Context);

  const { selectedGroup } = state;
  const group = state.groups[selectedGroup];
  const { averagePrice, EARate } = group.market;

  const averagePriceChangeHandler = (event) => {
    dispatch(changeMarketAveragePrice(event.target.value));
  };

  const EARateChangeHandler = (event) => {
    dispatch(changeMarketEARate(event.target.value));
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

export default Market;
