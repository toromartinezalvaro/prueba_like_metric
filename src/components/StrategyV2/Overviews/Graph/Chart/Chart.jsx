import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Styles from './Chart.module.scss';
import Line from '../../../../UI/ChartLine/ChartLine';

const Chart = ({ groupStrategies, initialMonth }) => {
  const makeArrayLabels = () => {
    const strategyDates =
      groupStrategies[1] !== undefined ? groupStrategies[1].data.length : 0;
    const marketDates = groupStrategies[0].data.length;
    const length = strategyDates > 0 ? strategyDates : marketDates;

    const month = initialMonth || Date.now();
    return Array(length)
      .fill(null)
      .map((_, index) =>
        moment(Number(month))
          .add(index, 'months')
          .format('MM/YY'),
      );
  };

  return (
    <Paper classes={{ root: Styles.container }}>
      <Grid container classes={{ root: Styles.header }}>
        <Grid>
          <Typography variant="h5">Precios</Typography>
        </Grid>
        <Grid> </Grid>
      </Grid>
      <Box pb={4} px={4}>
        <Line currentGroup={[...groupStrategies]} labels={makeArrayLabels()} />
      </Box>
    </Paper>
  );
};

Chart.propTypes = {
  groupStrategies: PropTypes.array.isRequired,
  initialMonth: PropTypes.number,
  allStrategies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const currentGroup =
    state.strategy.root.strategyLines[state.strategy.root.selectedGroup];

  const groupStrategies = [...currentGroup.strategies].map((strategy) => ({
    ...strategy,
    data: [...strategy.data],
  }));

  return {
    groupStrategies,
    initialMonth: currentGroup.initialMonth,
  };
};
export default connect(mapStateToProps)(Chart);
