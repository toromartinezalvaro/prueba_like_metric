import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import TotalOverview from './TotalOverview';
import SalesOverview from './SalesOverview';
import InventoryOverview from './InventoryOverview';
import Graph from './Graph';
import Context from '../../../containers/StrategyV2/context';
import {
  MAIN_VIEW,
  DETAILS_VIEW,
} from '../../../containers/StrategyV2/reducer';

const Overviews = () => {
  const { state } = useContext(Context);

  const [completedTransition, setCompletedTransition] = useState(false);

  return (
    <Grid container justify="space-between" spacing={5}>
      {completedTransition && (
        <Zoom
          in={state.view === DETAILS_VIEW}
          mountOnEnter
          unmountOnExit
          onExit={() => {
            setCompletedTransition(false);
          }}
        >
          <Grid item xs={12} lg={9}>
            <Graph />
          </Grid>
        </Zoom>
      )}

      <Zoom in={state.view === MAIN_VIEW} mountOnEnter unmountOnExit>
        <Grid item xs={12} lg={3}>
          <TotalOverview />
        </Grid>
      </Zoom>
      <Zoom
        in={state.view === MAIN_VIEW}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          setCompletedTransition(true);
        }}
      >
        <Grid item xs={12} lg={3}>
          <SalesOverview />
        </Grid>
      </Zoom>
      <Grid item xs={12} lg={3}>
        <InventoryOverview />
      </Grid>
    </Grid>
  );
};

export default Overviews;
