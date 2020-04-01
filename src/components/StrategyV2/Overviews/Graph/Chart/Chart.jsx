import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Styles from './Chart.module.scss';

const Chart = ({ data }) => {
  return (
    <Paper classes={{ root: Styles.container }}>
      <Grid container classes={{ root: Styles.header }}>
        <Grid>
          <Typography variant="h5">Precios</Typography>
        </Grid>
        <Grid> </Grid>
      </Grid>
      <div>
        <ResponsiveContainer width="99%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip isAnimationActive={false} />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.strategy.root.groups[state.strategy.root.selectedGroup].data,
});
export default connect(mapStateToProps)(Chart);
