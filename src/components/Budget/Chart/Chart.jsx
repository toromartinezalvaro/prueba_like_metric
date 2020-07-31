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
import Typography from '@material-ui/core/Typography';
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
        {data.length > 0 &&
        data[data.length - 1].estimationAccumulated !== 0 ? (
          <ResponsiveContainer>
            <ComposedChart width={1000} height={700} data={data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend isAnimationActive={false} />
              <Area
                type="monotone"
                name="Presupuesto acumulado"
                dataKey="estimationAccumulated"
                yAxisId="left"
                fill="#00abe7"
                stroke="#00abe7"
              />
              <Line
                name="Real acumulado"
                type="monotone"
                yAxisId="left"
                dataKey="realAccumulated"
                stroke="#A896FF"
                strokeWidth={2}
              />
              <Bar
                name="Presupuesto ventas"
                dataKey="estimatedSales"
                yAxisId="right"
                barSize={20}
                fill="#0083B3"
              />
              <Bar
                name="Ventas reales"
                dataKey="realSales"
                yAxisId="right"
                barSize={20}
                fill="#5e548e"
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <Typography align="center">
            No hay informacion para mostrar
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Chart;
