import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import PendingRequests from './PendingRequests';
import ResolvedRequests from './ResolvedRequests';
import RequestDialog from './Dialog';
import {
  startFetchData,
  succeededDataFetch,
  failedDataFetch,
  requestSelection,
  closeModal,
} from './actions';
import reducer, { initialState } from './reducer';
import AdditionalAreaRequestsServices from '../../../services/AdditionalAreaRequests';

const services = new AdditionalAreaRequestsServices();

const AdditionalAreaRequests = () => {
  const { towerId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        dispatch(startFetchData());
        const response = await services.getRequestByTower(towerId);
        if (active) {
          dispatch(succeededDataFetch(response.data));
        }
      } catch (error) {
        dispatch(failedDataFetch());
        console.error(error);
      }
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const handleSelectRequest = (request) => {
    dispatch(requestSelection(request));
  };

  const handleAccept = () => {
    dispatch(closeModal());
  };

  const handleReject = () => {
    dispatch(closeModal());
  };

  return (
    <Box my={2}>
      <PendingRequests
        loading={state.loading}
        requests={state.pending}
        selectHandler={handleSelectRequest}
      />
      <ResolvedRequests loading={state.loading} requests={state.resolved} />
      <RequestDialog
        open={state.modalOpen}
        request={state.selectedRequest}
        acceptHandler={handleAccept}
        rejectHandler={handleReject}
      />
    </Box>
  );
};

export default AdditionalAreaRequests;
