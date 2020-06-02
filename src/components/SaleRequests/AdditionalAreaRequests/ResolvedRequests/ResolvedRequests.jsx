import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import LoadingContainer from '../../../UI2/Loader';
import Styles from './ResolvedRequests.module.scss';

const ResolvedRequests = ({ loading, requests }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Áreas adicionales resueltas</Typography>
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
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={`resolvedRequest-${request.id}`}>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.nomenclature}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography> No hay solicitudes para mostrar</Typography>
          )}
        </LoadingContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ResolvedRequests.propTypes = {
  loading: PropTypes.bool,
  requests: PropTypes.array,
};

ResolvedRequests.defaultProps = {
  loading: false,
  requests: [],
};

export default ResolvedRequests;
