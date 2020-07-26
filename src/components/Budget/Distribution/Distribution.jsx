import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Counter from './Counter';
import BudgetGrid from './Grid';

const Distribution = ({ units, saleSpeed, salesStartDate, submitHandler }) => {
  const [length, setLength] = useState(saleSpeed);
  console.log({ salesStartDate });
  return (
    <Paper>
      <Box p={3}>
        <Counter units={units} length={length} setLength={setLength} />
        <BudgetGrid
          units={units}
          length={length}
          startDate={salesStartDate}
          submitHandler={submitHandler}
        />
      </Box>
    </Paper>
  );
};

Distribution.propTypes = {
  units: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number,
  salesStartDate: PropTypes.any,
  submitHandler: PropTypes.func,
  distribution: PropTypes.array.isRequired,
};

Distribution.defaultProps = {
  saleSpeed: 0,
  salesStartDate: new Date(),
  submitHandler: () => null,
};

export default Distribution;
