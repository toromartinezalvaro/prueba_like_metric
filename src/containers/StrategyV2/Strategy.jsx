import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useSnackbar } from 'notistack';
import Settings from '../../components/StrategyV2/Settings';
import Widgets from '../../components/StrategyV2/Widgets';
import Overviews from '../../components/StrategyV2/Overviews';
import APILoader from '../../components/StrategyV2/Loader';
import Loader from '../../components/UI2/Loader';
import { fetchDataInit, fetchDataStart, fetchDataEmpty } from './actions';
import IncrementServices from '../../services/incrementsV2/incrementsService';
import generateDataset from './helpers/dataset';

const services = new IncrementServices();
const Strategy = ({
  onFetchedData,
  onFetchedDataStart,
  onFetchedDataEmpty,
  loading,
  isEmpty,
}) => {
  const { towerId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetch() {
      try {
        onFetchedDataStart();
        const response = await services.getIncrementsAndStrategy(towerId);
        console.log(response, response.data.length === 0, response.data);
        if (response.data.length === 0) {
          console.log('Aqui');
          onFetchedDataEmpty();
        } else {
          console.log('Alla');
          onFetchedData({
            strategyLines: generateDataset(response.data.increments),
            groups: response.data.summary.increments,
          });
        }
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
    fetch();
  }, [towerId]);

  return (
    <Loader isLoading={loading}>
      {isEmpty ? (
        <div></div>
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
          </Box>{' '}
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
