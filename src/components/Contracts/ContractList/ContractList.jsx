/*
 * Created by Jcatman on Mon Dec 09 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import ContractService from '../../../services/contract/contractService';
import newContract from '../NewContract/NewContract';
import ViewContractInformation from '../ViewContractInformation/ViewContractInformation';
import statusOfContractEnum from '../NewContract/Content/GeneralInfo/statusOfContract.enum';
import commonStyles from '../../../assets/styles/variables.scss';
import EmptyContentMessageView from '../../UI/EmptyContentMessageView';
import ContractFlowService from '../../../services/contractFlow/contractFlowService';
import statusOfContract from '../NewContract/Content/GeneralInfo/statusOfContract.enum';
import style from './ContractList.module.scss';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      datesAndEvent: [],
      openDataView: false,
      contractId: 0,
      contractData: {},
      isLoading: true,
      contractAvailable: true,
      events: [],
    };
    this.services = new ContractService();
    this.service = new ContractFlowService();
  }

  componentDidUpdate() {
    if (this.props.currentContract) {
      this.service
        .getContractsInformation(this.props.towerId)
        .then((response) => {
          this.setState({ isLoading: true });
          const information = response.data;
          const data = [];

          information.map((contract) => {
            data.push(contract.salesStartDate);
            this.setState({ datesAndEvent: data, isLoading: false });
          });
          this.setTimeout(() => {
            this.setState({ isLoading: false });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        });
      this.services
        .getAllContracts(this.props.towerId)
        .then((contracts) => {
          const data = [];
          contracts.data.map((contract) => {
            data.push(contract);
          });
          this.setState({
            contracts: data,
            isLoading: false,
            contractAvailable: false,
            openDataView: false,
          });
          this.props.currentPut(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.setState({ events: this.props.events });
    this.service
      .getContractsInformation(this.props.towerId)
      .then((response) => {
        this.setState({ isLoading: true });

        const information = response.data;
        console.log('information', information);
        const data = [];
        information.flatMap((items) => {
          items.contracts.flatMap((contract) => {
            data.push(contract.schedulesDate.salesStartDate);
          });
          this.setState({ datesAndEvent: data, isLoading: false });
        });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    this.services
      .getAllContracts(this.props.towerId)
      .then((contracts) => {
        const data = [];
        contracts.data.map((contract) => {
          if (contract) {
            data.push(contract);
          }
          this.setState({ contractAvailable: false });
        });
        this.setState({ contracts: data, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeInformationView = () => {
    this.setState({ openDataView: false });
  };

  editContractOpened = (id) => () => {
    this.services
      .getContractById(this.props.towerId, id)
      .then((response) => {
        const contractDataView = response.data;
        const stateOfContract = statusOfContractEnum.find((option) => {
          return (
            option.id === contractDataView.generalInformation.state &&
            option.state
          );
        });
        this.props.sendId(id);

        this.setState({
          contractId: contractDataView.generalInformation.id,
          openDataView: true,
          contractDataView: {
            title: contractDataView.generalInformation.title,
            businessPartner: contractDataView.partner.patnerName,
            group: contractDataView.groupId.categoryName,
            state: stateOfContract.state,
            contractNumber: contractDataView.generalInformation.contractNumber,
            item: contractDataView.item.name,
            description: contractDataView.generalInformation.description,
            billings: contractDataView.billings,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  closeViewModal = () => {
    this.setState({
      openDataView: false,
    });
  };

  displayData = () => {
    return this.state.contracts.map((contract, i) => {
      const allPartners = this.props.listInformationPartner;
      const allGroups = this.props.listInformationGroup;
      const status = statusOfContract.map((element) => {
        return element.id === contract.state && element.state;
      });
      const partner = allPartners.map((element) => {
        return element.value === contract.businessPartnerId && element.label;
      });
      const group = allGroups.map((element) => {
        return element.value === contract.groupId && element.label;
      });
      return (
        <div
          className={style.wrapperInternal}
          key={contract.id}
          value={contract.id}
          onClick={this.editContractOpened(contract.id)}
        >
          <div className={style.dataContainer}>
            <div className={style.title}>{contract.title}</div>
            <div className={style.content}>{partner}</div>
            <div className={style.content}>{group}</div>
            <div className={style.content}>{status}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.grid}>
          <div className={style.container}>
            <div className={style.title}>Titulo</div>
            <div className={style.header}>Socio de Negocios</div>
            <div className={style.header}>Grupo</div>
            <div className={style.header}>Estado</div>
          </div>
          {this.state.isLoading ? (
            <div className={style.Loader} key="loader">
              <Loader
                type="ThreeDots"
                color={commonStyles.mainColor}
                height="100"
                width="100"
              />
            </div>
          ) : this.state.contractAvailable ? (
            <EmptyContentMessageView
              title="Vamos a crear contratos 📏!"
              message="Es fácil, debes hacer click en el botón superior y llenar el formulario"
            />
          ) : (
            <div>{this.displayData()}</div>
          )}
        </div>
        {this.state.openDataView && (
          <ViewContractInformation
            id={this.state.contractId}
            deleteContract={this.props.deleteContract}
            editContractOpen={this.props.editContractOpen}
            closeInformationView={this.closeInformationView}
            contractId={this.state.contractId}
            openView={this.state.openDataView}
            closeViewModal={this.closeViewModal}
            contractDataView={this.state.contractDataView}
            events={this.state.events}
          />
        )}
      </div>
    );
  }
}
export default ContractList;
