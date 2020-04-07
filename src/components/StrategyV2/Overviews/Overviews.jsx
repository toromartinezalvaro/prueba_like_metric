import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import TotalOverview from './TotalOverview';
import SalesOverview from './SalesOverview';
import InventoryOverview from './InventoryOverview';
import Graph from './Graph';
import { MAIN_VIEW, DETAILS_VIEW } from './reducer';

const Overviews = ({ view }) => {
  const [completedTransition, setCompletedTransition] = useState(false);

  return (
    <Grid container justify="space-between" spacing={5}>
      {completedTransition && (
        <Zoom
          in={view === DETAILS_VIEW}
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
      <Zoom in={view === MAIN_VIEW} mountOnEnter unmountOnExit>
        <Grid item xs={12} lg={3}>
          <TotalOverview />
        </Grid>
      </Zoom>
      <Zoom
        in={view === MAIN_VIEW}
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

Overviews.propTypes = {
  view: PropTypes.oneOf([MAIN_VIEW, DETAILS_VIEW]).isRequired,
};

const mapStateToProps = (state) => ({
  view: state.strategy.overviews.view,
});

export default connect(mapStateToProps)(Overviews);
