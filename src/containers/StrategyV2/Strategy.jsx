import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import _ from 'lodash';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import { fetchDataSuccess } from './actions';
import IncrementServices from '../../services/incrementsV2/incrementsService';
import styles from '../../assets/styles/variables.scss';

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

  const GRAPH_BASE = [
    { label: ['Mercado'], borderColor: '' },
    {
      id: 1,
      label: ['Continua'],
      borderColor: styles.mainColor,
      backgroundColor: styles.softMainColor,
      fill: null,
    },
    {
      id: 3,
      label: ['Semi-Continua'],
      borderColor: styles.greenColor,
      backgroundColor: styles.softGreenColor,
      fill: null,
    },
    {
      id: 9,
      label: ['Semi-Escalonada'],
      borderColor: styles.redColor,
      backgroundColor: styles.softRedColor,
      fill: null,
    },
    {
      id: 18,
      label: ['Escalonada'],
      borderColor: styles.yellowColor,
      backgroundColor: styles.softYellowColor,
      fill: null,
    },
  ];

  const makeArrayDataSets = (line, i) => {
    if (GRAPH_BASE) {
      const incrementsFixed = line.increments.map(
        (increment) => increment && increment.toFixed(2),
      );
      return {
        data: [...incrementsFixed],
        label: GRAPH_BASE[i].label,
        borderColor: GRAPH_BASE[i].borderColor,
        backgroundColor: GRAPH_BASE[i].backgroundColor,
        fill: GRAPH_BASE[i].fill,
        lineTension: 0.05,
      };
    }
  };

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

        const strategyLines = response.data.increments.map((increment) => {
          return {
            ...increment,
            strategies: increment.strategies.map(makeArrayDataSets),
          };
        });
        console.log('INCREMENTS --> ', {
          strategyLines,
          groups: response.data.summary.increments,
        });
        onFetchedData({
          strategyLines,
          groups: response.data.summary.increments,
        });
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
