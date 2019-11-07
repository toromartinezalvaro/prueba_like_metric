import React, { Component, Fragment } from 'react';
import Services from '../../services/SaleRequests';
import SaleRequestsTable from '../../components/SaleRequests/Table';
import SaleRequestsModal from '../../components/SaleRequests/Modal';
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

  render() {
    return (
      <Fragment>
        <Loader isLoading={this.state.loading}>
          <SaleRequestsTable
            saleRequests={this.state.saleRequests}
            showSaleRequestHandler={this.handleShowSaleRequest}
          />
          <SaleRequestsModal
            open={this.state.modalState}
            approveHandler={this.handleApprove}
            rejectHandler={this.handleReject}
            cancelHandler={this.handleCancel}
            saleRequest={this.state.saleRequest}
          />
        </Loader>
      </Fragment>
    );
  }
}

export default SalesRequests;
