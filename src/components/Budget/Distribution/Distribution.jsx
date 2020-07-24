import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Counter from './Counter';
import BudgetGrid from './Grid';

const Distribution = ({ units, saleSpeed, startDate, submitHandler }) => {
  const [length, setLength] = useState(saleSpeed);

  return (
    <Paper>
      <Box p={3}>
        <Counter units={units} length={length} setLength={setLength} />
        <BudgetGrid
          units={units}
          length={length}
          startDate={startDate}
          submitHandler={submitHandler}
        />
      </Box>
    </Paper>
  );
};

Distribution.propTypes = {
  units: PropTypes.number.isRequired,
  saleSpeed: PropTypes.number,
  startDate: PropTypes.any, // TODO: Buscar valores de moment
  submitHandler: PropTypes.func,
  distribution: PropTypes.array.isRequired,
};

Distribution.defaultProps = {
  saleSpeed: 0,
  startDate: new Date(),
  submitHandler: () => null,
};

export default Distribution;
