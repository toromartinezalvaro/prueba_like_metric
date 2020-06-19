import React, { Component } from 'react';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import TableCashFlow from '../../components/CashFlow/TableCashFlow';
import CashFlowServices from '../../services/cashFlow/CashFlowService';
import LoadableContainer from '../../components/UI/Loader';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import ExportExcel from '../../components/CashFlow/Imports/Imports';

class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.services = new CashFlowServices(this);
  }

  state = {
    data: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getCashFlow(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ data: response.data, isLoading: false });
      });
  }

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <Card>
          <CardHeader>
            <span>Recaudo Ventas Futuras</span>
          </CardHeader>
          <CardBody>
            <ExportExcel data={this.state.data} />
            <TableCashFlow data={this.state.data} />
          </CardBody>
        </Card>
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(ReportContainer);
