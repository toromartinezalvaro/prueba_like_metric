import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Box from '@material-ui/core/Box';

const AdditionalAreaRequests = () => {
  return (
    <Box my={2}>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          Solicutudes de areas adicionales pendientes
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>Solicitud</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          Solicutudes de areas adicionales resueltas
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>Solicitud</ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

export default AdditionalAreaRequests;
