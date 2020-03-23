import React, { useReducer } from 'react';
import Box from '@material-ui/core/Box';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';

const Strategy = () => {
  return (
    <div>
      <Box>
        <Settings />
      </Box>
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
