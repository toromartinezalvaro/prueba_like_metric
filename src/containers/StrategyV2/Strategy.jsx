import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useSnackbar } from 'notistack';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import APILoader from '../../components/StrategyV2/Loader';
import Loader from '../../components/UI2/Loader';
import Message from '../../components/StrategyV2/Message/Message';

import { fetchDataInit, fetchDataStart, fetchDataEmpty } from './actions';
import IncrementServices from '../../services/incrementsV2/incrementsService';
import generateDataset from './helpers/dataset';
import InventorySalesSepeedModal from '../../components/StrategyV2/Overviews/InventoryOverview/SalesSpeedModal/InventorySalesSepeedModal';

const services = new IncrementServices();
const Strategy = ({
  onFetchedData,
  onFetchedDataStart,
  onFetchedDataEmpty,
  loading,
  isEmpty,
}) => {
  const { towerId } = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetch() {
      try {
        onFetchedDataStart();
        const response = await services.getIncrementsAndStrategy(towerId);
        if (response.data.length === 0) {
          onFetchedDataEmpty();
        } else {
          onFetchedData({
            strategyLines: generateDataset(response.data.increments),
            groups: response.data.summary.increments,
          });
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
    fetch();
  }, [towerId, location]);

  return (
    <Loader isLoading={loading}>
      {isEmpty ? (
        <Message />
      ) : (
        <div>
          <Box mb={2}>
            <APILoader />
          </Box>
          <Box>
            <Settings />
          </Box>
          <Box mb={3}>
            <Widgets />
          </Box>
          <Box>
            <Overviews />
            <InventorySalesSepeedModal />
          </Box>
        </div>
      )}
    </Loader>
  );
};

Strategy.propTypes = {
  onFetchedDataStart: PropTypes.func.isRequired,
  onFetchedData: PropTypes.func.isRequired,
  onFetchedDataEmpty: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  validGroup: state.strategy.root.selectedGroup,
  loading: state.strategy.root.loading,
  isEmpty: state.strategy.root.isEmpty,
});

const mapDispatchToProps = {
  onFetchedDataStart: fetchDataStart,
  onFetchedData: fetchDataInit,
  onFetchedDataEmpty: fetchDataEmpty,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strategy);
