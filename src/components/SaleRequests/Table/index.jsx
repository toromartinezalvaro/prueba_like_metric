import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '../../UI/Table/Table';
import Button from '../../UI2/Button';
import Styles from './SaleRequestsTable.module.scss';
import Card, { CardHeader, CardBody } from '../../UI/Card/Card';

const SaleRequestTable = ({ saleRequests, showSaleRequestHandler }) => {
  const getPendingData = () => {
    return saleRequests.pending.map((request, index) => {
      return [
        request.property.name,
        <Button
          key={`saleRequestAction-${index}`}
          onClick={() => {
            showSaleRequestHandler(request.saleRequest.id);
          }}
        >
          Abrir
        </Button>,
      ];
    });
  };

  const getResolvedData = () => {
    return saleRequests.resolved.map((request, index) => {
      return [
        request.property.name,
        request.saleRequest.requestStatus,
        <Button
          key={`solvedSaleRequestAction-${index}`}
          onClick={() => {
            showSaleRequestHandler(request.saleRequest.id);
          }}
        >
          Abrir
        </Button>,
      ];
    });
  };

  return (
    <Card>
      <CardHeader>
        <span>Solicitudes de venta</span>
      </CardHeader>
      <CardBody>
        <ExpansionPanel>
          <ExpansionPanelSummary>Pendientes</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table
              intersect="Pendientes"
              headers={['Propiedad', '']}
              columns={[]}
              data={getPendingData()}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary>Resueltos</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table
              intersect="Resueltos"
              headers={['Propiedad', 'Estado', '']}
              columns={[]}
              data={getResolvedData()}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CardBody>
    </Card>
  );
};

SaleRequestTable.propTypes = {
  saleRequests: PropTypes.object.isRequired,
  showSaleRequestHandler: PropTypes.func.isRequired,
};

export default SaleRequestTable;
