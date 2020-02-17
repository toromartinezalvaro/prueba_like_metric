import React, { Component, Fragment } from 'react';
import Services from '../../services/SaleRequests';
import SaleRequestsTable from '../../components/SaleRequests/Table';
import SaleRequestsModal from '../../components/SaleRequests/Modal';
import DesistDialog from '../../components/SaleRequests/DesistDialog';
import Loader from '../../components/UI/Loader';

class SalesRequests extends Component {
  constructor(props) {
    super(props);
    this.services = new Services(this);
  }

  state = {
    saleRequests: {
      pending: [],
      resolved: [],
    },
    saleRequest: undefined,
    modalState: false,
    loading: false,
    desistDialogOpen: false,
    desistRequestId: null,
    propertyId: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.services
      .getSaleRequest(this.props.match.params.id)
      .then((response) => {
        this.setState({
          modalState: true,
          saleRequest: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error(error);
      });
    this.services
      .getSaleRequests(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ saleRequests: response.data, loading: false });
      });
  }

  getRequests = () => {
    this.services
      .getSaleRequests(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ saleRequests: response.data, loading: false });
      });
  };

  fetchSaleRequest = (id) => {
    this.setState({ loading: true });
    this.services
      .getSaleRequest(id)
      .then((response) => {
        this.setState({
          modalState: true,
          saleRequest: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error(error);
      });
  };

  handleShowSaleRequest = (id) => {
    this.fetchSaleRequest(id);
  };

  handleApprove = (id, request) => {
    this.services
      .putSaleRequest(id, request)
      .then((response) => {
        this.getRequests();
        this.setState({ modalState: false, saleRequest: undefined });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleReject = (id, request) => {
    this.services
      .putSaleRequest(id, request)
      .then((response) => {
        this.getRequests();
        this.setState({ modalState: false, saleRequest: undefined });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCancel = () => {
    this.setState({ modalState: false, saleRequest: undefined });
  };

  handleDesistDialogOpen = (desistRequestId, propertyId) => {
    this.setState({ desistDialogOpen: true, desistRequestId, propertyId });
  };

  updatePriceProperty = (propertyId, values) => {
    this.services
      .putPriceProperty(propertyId, values)
      .then((approvedRequest) => {
        const tempSaleRequests = this.state.saleRequests;
        tempSaleRequests.pending.splice(
          tempSaleRequests.pending.indexOf(approvedRequest.data),
          1,
        );
        tempSaleRequests.resolved.push(approvedRequest.data);
        this.setState({
          desistDialogOpen: false,
          saleRequest: tempSaleRequests,
        });
      });
  };

  render() {
    console.log(this.state.saleRequests);
    return (
      <Fragment>
        <Loader isLoading={this.state.loading}>
          <SaleRequestsTable
            saleRequests={this.state.saleRequests}
            showSaleRequestHandler={this.handleShowSaleRequest}
            handleDesistDialogOpen={this.handleDesistDialogOpen}
          />
          <SaleRequestsModal
            open={this.state.modalState}
            approveHandler={this.handleApprove}
            rejectHandler={this.handleReject}
            cancelHandler={this.handleCancel}
            saleRequest={this.state.saleRequest}
          />
          <DesistDialog
            open={this.state.desistDialogOpen}
            desistRequestId={this.state.desistRequestId}
            propertyId={this.state.propertyId}
            updatePriceProperty={this.updatePriceProperty}
            closeHandler={() => {
              this.setState({ desistDialogOpen: false });
            }}
          />
        </Loader>
      </Fragment>
    );
  }
}

export default SalesRequests;
