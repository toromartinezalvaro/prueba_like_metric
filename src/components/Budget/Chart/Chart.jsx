import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import MuiPaper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const Paper = styled(MuiPaper)`
  padding: 16px;
`;

const Chart = () => {
  const data = useSelector((state) => state.budget.chart.data);

  return (
    <Paper>
      <Box width="100%" height="300px">
        <ResponsiveContainer>
          <ComposedChart width={1000} height={700} data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              name="Presupuesto acumulado"
              dataKey="estimationAccumulated"
              yAxisId="left"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar
              name="Presupuesto ventas"
              dataKey="estimatedSales"
              yAxisId="right"
              barSize={20}
              fill="#000000"
            />
            <Bar
              name="Ventas reales"
              dataKey="realSales"
              yAxisId="right"
              barSize={20}
              fill="#413ea0"
            />
            <Line
              name="Real acumulado"
              type="monotone"
              yAxisId="left"
              dataKey="realAccumulated"
              stroke="#ff7300"
            />           
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default Chart;
