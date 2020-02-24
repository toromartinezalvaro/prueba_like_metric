import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const SaleRequestTable = ({
  saleRequests,
  showSaleRequestHandler,
  handleDesistDialogOpen,
}) => {
  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>Solicitudes de venta pendientes</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Propiedad</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saleRequests.pending.map((request, index) => {
                  return (
                    <TableRow key={`pendingSaleRequest-${index}`}>
                      <TableCell>{request.property.name}</TableCell>
                      <TableCell>{request.saleRequest.requestStatus}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (
                              request.saleRequest.requestStatus === 'Desistido'
                            ) {
                              handleDesistDialogOpen(
                                request.saleRequest.id,
                                request.property.id,
                              );
                            } else {
                              showSaleRequestHandler(request.saleRequest.id);
                            }
                          }}
                        >
                          Abrir
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>Solicitudes de venta resultas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Propiedad</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saleRequests.resolved.map((request, index) => {
                  return (
                    <TableRow key={`pendingSaleRequest-${index}`}>
                      <TableCell>{request.property.name}</TableCell>
                      <TableCell>{request.saleRequest.requestStatus}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            showSaleRequestHandler(request.saleRequest.id);
                          }}
                        >
                          Abrir
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

SaleRequestTable.propTypes = {
  saleRequests: PropTypes.object.isRequired,
  showSaleRequestHandler: PropTypes.func.isRequired,
};

export default SaleRequestTable;
