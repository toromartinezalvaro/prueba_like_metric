import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { getMonthsDiff } from './helpers';
import LastMonthExecution from './LastMonth';
import CurrentMonthExecution from './CurrentMonth';

const Execution = () => {
  const data = useSelector((state) => state.budget.chart.data);
  const salesStartDate = useSelector(
    (state) => state.budget.distribution.salesStartDate,
  );

  const monthsDiff = useMemo(() => getMonthsDiff(Number(salesStartDate)), [
    salesStartDate,
  ]);

  return data.length > 0 &&
    data[data.length - 1].estimationAccumulated !== 0 ? (
    <>
      <LastMonthExecution />
      <CurrentMonthExecution />
    </>
  ) : // <Grid container spacing={3}>
  //   <Grid item lg={4}>
  //     <Paper>
  //       <Box p={3}>
  //         Real acumulado: {data[monthsDiff].realAccumulated.toFixed(2)}
  //       </Box>
  //     </Paper>
  //   </Grid>
  //   <Grid item lg={4}>
  //     <Paper>
  //       <Box p={3}>
  //         Presupuestal acumulado: {data[monthsDiff].estimationAccumulated}
  //       </Box>
  //     </Paper>
  //   </Grid>
  //   <Grid item lg={4}>
  //     <Paper>
  //       <Box p={3}>
  //         Ejecución:{' '}
  //         {(
  //           (data[monthsDiff].realAccumulated /
  //             data[monthsDiff].estimationAccumulated) *
  //           100
  //         ).toFixed(2)}{' '}
  //         %
  //       </Box>
  //     </Paper>
  //   </Grid>
  // </Grid>
  null;
};

export default Execution;
