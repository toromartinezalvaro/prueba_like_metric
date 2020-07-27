import moment from 'moment';

export const getMonthsDiff = (salesStartDate) => {
  return moment().diff(salesStartDate, 'months');
};

export const getPartialSum = (arr, items) => {
  return arr.slice(0, items).reduce((acc, val) => acc + val, 0);
};
