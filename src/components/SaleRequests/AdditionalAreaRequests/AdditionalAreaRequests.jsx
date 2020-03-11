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
  resolveRequest,
} from './actions';
import reducer, { initialState } from './reducer';
import AdditionalAreaRequestsServices from '../../../services/AdditionalAreaRequests';

const services = new AdditionalAreaRequestsServices();

const ACCEPT = 'A';
const REJECT = 'R';

const AdditionalAreaRequests = ({ alert }) => {
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
        alert(error, 'error');
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

  const handleAccept = async (id) => {
    try {
      await services.putRequestStatus(id, ACCEPT);
      alert('Solicitud procesada correctamente', 'success');
      dispatch(resolveRequest(id));
    } catch (error) {
      alert(error, 'error');
      dispatch(closeModal());
    }
  };

  const handleReject = async (id) => {
    try {
      await services.putRequestStatus(id, REJECT);
      alert('Solicitud procesada correctamente', 'success');
      dispatch(resolveRequest(id));
    } catch (error) {
      alert(error, 'error');
      dispatch(closeModal());
    }
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
