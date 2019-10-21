import React, { Component } from 'react';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import TableCashFlow from '../../components/CashFlow/TableCashFlow';
import CashFlowServices from '../../services/cashFlow/CashFlowService';

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.services = new CashFlowServices(this);
  }

  state = {
    data: [],
  };

  componentDidMount() {
    this.services
      .getCashFlow(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ data: response.data });
      });
  }
  render() {
    return <TableCashFlow data={this.state.data} />;
  }
}

export default withDefaultLayout(ReportContainer);
