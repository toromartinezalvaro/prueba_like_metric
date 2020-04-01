import React, { memo, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import _ from 'lodash';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import { fetchDataSuccess } from './actions';
import reducer, { initialState } from './reducer';
import IncrementServices from '../../services/incrementsV2/incrementsService';

const Strategy = ({ validGroup, onFetchedData }) => {
  const services = new IncrementServices();

  const helper = [
    'mercado',
    'continua',
    'semicontinua',
    'semiescalonada',
    'escalonada',
  ];

  useEffect(() => {
    async function fetch() {
      try {
        const response = await services.getIncrementsAndStrategy(
          '86905mrNYjuVx8X3B1dASdnANO6Y00c50j9KMW8JtMZy25R8VpiVrdyVNGAw',
        );

        const groupsStrategy = [];

        response.data.increments.forEach((group, indexGroup) => {
          groupsStrategy.push({
            id: group.id,
            lines: _.times(
              group.strategies[0].increments.length,
              _.constant({}),
            ),
          });
          group.strategies.forEach((strategy, indexStrategy) => {
            strategy.increments.forEach((line, indexLine) => {
              groupsStrategy[indexGroup].lines[indexLine][
                helper[indexStrategy]
              ] = line;
            });
          });
        });

        /*         onFetchedData();
         */
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
