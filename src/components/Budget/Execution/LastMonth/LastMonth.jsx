import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExecutionWidget from '../Widget';
import { getMonthsDiff, getMonthValue, getExecution } from '../helpers';

const LastMonth = () => {
  const data = useSelector((state) => state.budget.chart.data);
  const salesStartDate = useSelector(
    (state) => state.budget.distribution.salesStartDate,
  );

  const monthsDiff = useMemo(() => getMonthsDiff(Number(salesStartDate)), [
    salesStartDate,
  ]);

  const realSales = useMemo(
    () => getMonthValue(data, monthsDiff - 1, 'realAccumulated'),
    [data, monthsDiff],
  );

  const estimatedSales = useMemo(
    () => getMonthValue(data, monthsDiff - 1, 'estimationAccumulated'),
    [data, monthsDiff],
  );
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Ejecución presupuestal a{' '}
          {moment()
            .subtract(1, 'month')
            .format('MMMM [de] YYYY')}
        </Typography>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Real acumulado">
          <Typography component="span">{realSales}</Typography>
        </ExecutionWidget>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Presupuesto acumulado">
          <Typography component="span">{estimatedSales}</Typography>
        </ExecutionWidget>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Ejecución">
          <Typography component="span">
            {getExecution(realSales, estimatedSales)}
          </Typography>
        </ExecutionWidget>
      </Grid>
    </Grid>
  );
};

export default LastMonth;
