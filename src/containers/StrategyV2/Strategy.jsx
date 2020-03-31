import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import { fetchDataSuccess } from './actions';

const Strategy = ({ validGroup, onFetchedData }) => {
  useEffect(() => {
    async function fetch() {
      try {
        //const response = await services.getData(useHistory);
        //onFetchedData(null);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, []);

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

const mapStateToProps = (state) => ({
  validGroup: state.strategy.root.selectedGroup,
});

const mapDispatchToProps = {
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategy);
