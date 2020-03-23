import React from 'react';
import Box from '@material-ui/core/Box';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';

const Strategy = () => {
  return (
    <div>
      <Box mb={3}>
        <Widgets />
      </Box>
      <Box>
        <Overviews />
      </Box>
    </div>
  );
};

export default Strategy;
