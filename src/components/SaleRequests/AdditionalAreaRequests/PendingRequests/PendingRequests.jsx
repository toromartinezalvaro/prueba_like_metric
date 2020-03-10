import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

const PendingRequests = ({ requests }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Badge badgeContent={requests.length} color="secondary">
          <Typography> Areas adicionales pendientes</Typography>
        </Badge>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {requests.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo de area</TableCell>
                <TableCell>Nomenclatura</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={`resolvedRequest-${request.id}`}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.nomenclature}</TableCell>
                  <TableCell>
                    <Button color="primary" variant="contained">
                      Abrir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          'No hay solicitudes pendientes'
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

PendingRequests.propTypes = {
  requests: PropTypes.array,
};

PendingRequests.defaultProps = {
  requests: [],
};

export default PendingRequests;
