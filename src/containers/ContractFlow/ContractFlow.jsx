/*
 * Created by Jcatman on Fri Dec 20 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import ContractFlowService from '../../services/contractFlow/contractFlowService';
import TableContractFlow from '../../components/ContractFlow/TableContractFlow';
import Table from '../../components/UI/Table/Table';
import Style from './ContractFlow.module.scss';

class ContractFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.service = new ContractFlowService();
  }

  componentDidMount() {
    this.service
      .getContractsInformation(this.props.match.params.towerId)
      .then((response) => {
        const information = response.data;
        information.map((contract) => {
          console.log(contract);
        });

        this.setState({ data: response.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <span>Flujo de caja de contratos</span>
        </CardHeader>
        <CardBody>
          <TableContractFlow data={this.state.data} />
        </CardBody>
      </Card>
    );
  }
}

export default ContractFlow;
