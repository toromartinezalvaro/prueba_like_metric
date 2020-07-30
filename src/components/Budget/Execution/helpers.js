import moment from 'moment';

export const getMonthsDiff = (salesStartDate) => {
  return moment().diff(salesStartDate, 'months');
};

export const getExecution = (real, estimation) => {
  if (typeof real !== 'number' || typeof estimation !== 'number') {
    return 'No aplica';
  }
  if (estimation === 0) {
    return 'No aplica';
  }
  return `${(real / estimation).toFixed(2)}%`;
};

export const getMonthValue = (arr, index, key) => {
  if (index < 0) {
    return 'No aplica';
  }
  return arr[index][key];
};
