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
    type: '',
    arrayCashFlow: [],
    endOfConstruction: '',
    salesStart: '',
  };

  componentDidMount() {
    this.services
      .getCashFlow(this.props.match.params.towerId)
      .then((response) => {
        const { type, arrayCashFlow } = response.data[0];
        console.log(response);
        this.setState({ type, arrayCashFlow });
      });
  }
  render() {
    return <TableCashFlow data={this.state.arrayCashFlow} />;
  }
}

export default withDefaultLayout(ReportContainer);
