import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import LoadingContainer from '../../../UI2/Loader';
import Styles from './PendingRequests.module.scss';

const PendingRequests = ({ loading, requests, selectHandler }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Badge badgeContent={requests.length} color="secondary">
          <Typography> Areas adicionales pendientes</Typography>
        </Badge>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails
        classes={requests.length > 0 ? { root: Styles.noPadding } : {}}
      >
        <LoadingContainer isLoading={loading}>
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
                      <Button
                        onClick={() => {
                          selectHandler(request);
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Abrir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No hay solicitudes pendientes</Typography>
          )}
        </LoadingContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

PendingRequests.propTypes = {
  loading: PropTypes.bool,
  requests: PropTypes.array,
  selectHandler: PropTypes.func.isRequired,
};

PendingRequests.defaultProps = {
  loading: false,
  requests: [],
};

export default PendingRequests;
