import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import PendingRequests from './PendingRequests';
import ResolvedRequests from './ResolvedRequests';
import RequestDialog from './Dialog';
import AdditionalAreaRequestsServices from '../../../services/AdditionalAreaRequests';

const services = new AdditionalAreaRequestsServices();

const AdditionalAreaRequests = () => {
  const { towerId } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const response = await services.getRequestByTower(towerId);
        if (active) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Box my={2}>
      <PendingRequests requests={requests.pending} />
      <ResolvedRequests requests={requests.resolved} />
      <RequestDialog />
    </Box>
  );
};

export default AdditionalAreaRequests;
