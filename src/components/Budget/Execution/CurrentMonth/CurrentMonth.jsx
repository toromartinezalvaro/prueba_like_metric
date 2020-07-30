import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExecutionWidget from '../Widget';
import CurrentMontBudget from './Budget';
import { getMonthsDiff, getExecution as calculateExecution } from '../helpers';

const CurrentMonth = () => {
  const data = useSelector((state) => state.budget.chart.data);
  const salesStartDate = useSelector(
    (state) => state.budget.distribution.salesStartDate,
  );
  const currentMonthSales = useSelector(
    (state) => state.budget.distribution.currentMonthSales,
  );

  const monthsDiff = useMemo(() => getMonthsDiff(Number(salesStartDate)), [
    salesStartDate,
  ]);

  const estimatedSales = useMemo(() => data[monthsDiff].estimatedSales, [
    data,
    monthsDiff,
  ]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Ejecución presupuestal mes actual</Typography>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Real">
          <Typography component="span">{currentMonthSales}</Typography>
        </ExecutionWidget>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Presupuesto">
          <CurrentMontBudget units={estimatedSales} month={monthsDiff} />
        </ExecutionWidget>
      </Grid>
      <Grid item lg={4}>
        <ExecutionWidget title="Ejecución">
          <Typography component="span">
            {calculateExecution(currentMonthSales, estimatedSales)}
          </Typography>
        </ExecutionWidget>
      </Grid>
    </Grid>
  );
};

export default CurrentMonth;
