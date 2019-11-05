import React, { Component, Fragment } from 'react';
import Services from '../../services/SaleRequests';
import SaleRequestsTable from '../../components/SaleRequests/Table';
import SaleRequestsModal from '../../components/SaleRequests/Modal';

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
    // this.setState({ modalState: true, loading: true });
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
    // this.services
    //   .getSaleRequests(this.props.match.params.towerId)
    //   .then((response) => {
    //     this.setState({ saleRequests: response.data });
    //   });
  }

  fetchSaleRequest = (id) => {
    this.setState({ modalState: true, loading: true });
    this.services
      .getSaleRequest(id)
      .then((response) => {
        this.setState({ saleRequest: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error(error);
      });
  };

  handleShowSaleRequest = () => {
    this.setState({ modalState: true });
  };

  handleApprove = () => {
    this.setState({ modalState: false });
  };

  handleReject = () => {
    this.setState({ modalState: false });
  };

  handleCancel = () => {
    this.setState({ modalState: false });
  };

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default SalesRequests;
