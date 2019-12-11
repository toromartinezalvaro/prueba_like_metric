/*
 * Created by Jcatman on Mon Dec 09 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import ContractService from '../../../services/contract/contractService';
import newContract from '../NewContract/NewContract';
import ViewContractInformation from '../ViewContractInformation/ViewContractInformation';
import style from './ContractList.module.scss';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      openDataView: false,
      contractId: 0,
      contractData: {},
    };
    this.services = new ContractService();
  }

  componentDidMount() {
    this.services
      .getAllContracts(this.props.towerId)
      .then((contracts) => {
        let data = [];
        contracts.data.map((contract) => {
          data.push(contract);
        });
        this.setState({ contracts: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editContractOpened = (id) => () => {
    // this.props.editContractOpen(true, id);
    this.services
      .getContractById(this.props.towerId, id)
      .then((response) => {
        const contractDataView = response.data;
        this.services
          .getPartnerById(contractDataView.businessPartnerId)
          .then((partner) => {
            const partnerName = partner.data.patnerName;
            this.services
              .getCategoryById(contractDataView.groupId)
              .then((group) => {
                const groupName = group.data.categoryName;
                this.services
                  .getBillingsById(this.props.towerId, contractDataView.id)
                  .then((billings) => {
                    console.log('Las cuentas', billings.data);
                    this.setState({
                      contractId: contractDataView.id,
                      openDataView: true,
                      contractDataView: {
                        title: contractDataView.title,
                        businessPartner: partnerName,
                        group: groupName,
                        state: contractDataView.state,
                        contractNumber: contractDataView.contractNumber,
                        item: contractDataView.item,
                        description: contractDataView.description,
                        billings: billings.data,
                      },
                    });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  closeViewModal = () => {
    this.setState({
      openDataView: false,
    });
  };

  displayData = () => {
    return this.state.contracts.map((contract) => {
      return (
        <div
          className={style.wrapper}
          key={contract.id}
          value={contract.id}
          onClick={this.editContractOpened(contract.id)}
        >
          <div className={style.dataContainer}>
            <div className={style.content}>{contract.title}</div>
            <div className={style.content}>{contract.businessPartnerId}</div>
            <div className={style.content}>{contract.itemId}</div>
            <div className={style.content}>Fecha de Inicio</div>
            <div className={style.content}>Archivos</div>
            <div className={style.content}>{contract.state}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.header}>Titulo</div>
          <div className={style.header}>Socio de Negocios</div>
          <div className={style.header}>Item</div>
          <div className={style.header}>Fecha de Inicio</div>
          <div className={style.header}>Archivos</div>
          <div className={style.header}>Estado</div>
        </div>
        <div>{this.displayData()}</div>
        {this.state.openDataView && (
          <ViewContractInformation
            editContractOpen={this.props.editContractOpen}
            contractId={this.state.contractId}
            openView={this.state.openDataView}
            closeViewModal={this.closeViewModal}
            contractDataView={this.state.contractDataView}
          />
        )}
      </div>
    );
  }
}
export default ContractList;
