import React, { memo, useReducer } from 'react';
import Box from '@material-ui/core/Box';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import reducer, { initialState } from './reducer';
import Context from './context';

const Strategy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Context.Provider value={{ state, dispatch }}>
        <Box>
          <Settings />
        </Box>
        <Box mb={3}>
          <Widgets />
        </Box>
        <Box>
          <Overviews />
        </Box>
      </Context.Provider>
    </div>
  );
};

export default memo(Strategy);
