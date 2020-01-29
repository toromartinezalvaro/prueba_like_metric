/*
 * Created by Jcatman on Fri Dec 20 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { CardContent } from '@material-ui/core';
import Card, {
  CardHeader,
  CardBody,
  CardFooter,
} from '../../components/UI/Card/Card';
import ContractFlowService from '../../services/contractFlow/contractFlowService';
import TableContractFlow from '../../components/ContractFlow/TableContractFlow';
import commonStyles from '../../assets/styles/variables.scss';
import Table from '../../components/UI/Table/Table';
import Style from './ContractFlow.module.scss';

class ContractFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      contractsAvailable: true,
    };
    this.service = new ContractFlowService();
  }

  componentDidMount() {
    this.service
      .getContractsInformation(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ isLoading: true });
        const information = response.data;
        information.map((contract) => {
          if (contract) {
            console.log(contract);
          } else {
            this.setState({ contractsAvailable: false });
          }
        });

        this.setState({ data: response.data, isLoading: false });
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
          {this.state.isLoading ? (
            <div className={Style.Loader}>
              <Loader color={commonStyles.mainColor} height="100" width="100" />
            </div>
          ) : (
            <TableContractFlow data={this.state.data} />
          )}
          {this.state.contractsAvailable && (
            <Card>
              <CardContent>
                <span className={Style.noContractBody}>
                  <strong>No hay contratos creados:</strong> Hay que crear
                  algunos contratos!
                </span>
              </CardContent>
            </Card>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default ContractFlow;
