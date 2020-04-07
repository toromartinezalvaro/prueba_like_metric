import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import _ from 'lodash';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import Loader from '../../components/UI2/Loader';
import { fetchDataSuccess, fetchDataStart } from './actions';
import IncrementServices from '../../services/incrementsV2/incrementsService';
import generateDataset from './helpers/dataset';

const services = new IncrementServices();
const Strategy = ({ onFetchedData, onFetchedDataStart, loading }) => {
  const { towerId } = useParams();

  useEffect(() => {
    async function fetch() {
      try {
        onFetchedDataStart();
        const response = await services.getIncrementsAndStrategy(towerId);

        onFetchedData({
          strategyLines: generateDataset(response.data.increments),
          groups: response.data.summary.increments,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [towerId]);

  return (
    <Loader isLoading={loading}>
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
    </Loader>
  );
};

Strategy.propTypes = {
  onFetchedDataStart: PropTypes.func.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  validGroup: state.strategy.root.selectedGroup,
  loading: state.strategy.root.loading,
});

const mapDispatchToProps = {
  onFetchedDataStart: fetchDataStart,
  onFetchedData: fetchDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategy);
