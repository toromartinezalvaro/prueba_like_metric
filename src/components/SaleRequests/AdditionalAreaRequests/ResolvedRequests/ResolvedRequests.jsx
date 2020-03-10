import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Styles from './ResolvedRequests.module.scss';

const ResolvedRequests = ({ requests }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Areas adicionales resueltas</Typography>
      </ExpansionPanelSummary>
      {requests.length > 0 ? (
        <ExpansionPanelDetails classes={{ root: Styles.noPadding }}>
          <TableContainer component={Paper}>
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
          </TableContainer>
        </ExpansionPanelDetails>
      ) : (
        <ExpansionPanelDetails>
          <Typography> No hay solicitudes para mostrar</Typography>
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
};

ResolvedRequests.propTypes = {
  requests: PropTypes.array,
};

ResolvedRequests.defaultProps = {
  requests: [],
};

export default ResolvedRequests;
