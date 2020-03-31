import React, { memo, useReducer } from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import reducer, { initialState } from './reducer';
import Context from './context';

const Strategy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   async function fetch() {
  //     const response = await services.getData(useHistory)
  //     onFetchedData(response.data)
  //   }
  // }, []);

  return (
    <div>
      <Context.Provider value={{ state, dispatch }}>
        <Box>
          <Settings />
        </Box>
        {state.selectedGroup !== null ? (
          <>
            <Box mb={3}>
              <Widgets />
            </Box>
            <Box>
              <Overviews />
            </Box>
          </>
        ) : (
          <Typography
            variant="h4"
            component="span"
            display="block"
            align="center"
          >
            Debe selecionar un grupo
          </Typography>
        )}
      </Context.Provider>
    </div>
  );
};

export default memo(Strategy);
