import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import _ from 'lodash';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import { fetchDataSuccess } from './actions';
import IncrementServices from '../../services/incrementsV2/incrementsService';

const services = new IncrementServices();
const Strategy = ({ onFetchedData }) => {
  const { towerId } = useParams();

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
        const response = await services.getIncrementsAndStrategy(towerId);

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
        onFetchedData(response.data.summary.increments);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [towerId]);

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

Strategy.propTypes = {
  onFetchedData: PropTypes.func.isRequired,
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
