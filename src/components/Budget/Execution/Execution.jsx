import React from 'react';
import { useSelector } from 'react-redux';
import LastMonthExecution from './LastMonth';
import CurrentMonthExecution from './CurrentMonth';

const Execution = () => {
  const data = useSelector((state) => state.budget.chart.data);

  if (!data) {
    return null;
  }
  return data.length > 0 &&
    data[data.length - 1].estimationAccumulated !== 0 ? (
    <>
      <LastMonthExecution />
      <CurrentMonthExecution />
    </>
  ) : null;
};

export default Execution;
