import React, { Component } from 'react';
import ContractService from '../../../services/contract/contractService';
import style from './ContractList.module.scss';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      contratos: [],
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

  displayData = () => {
    console.log('esta es', this.state.contracts);
    return this.state.contracts.map((contract) => {
      return (
        <div className={style.wrapper} 
        key={contract.id}
        value={contract.id}
        onClick={(e) => {console.log('clicked bro!', e.target.value)}}>
          <div className={style.dataContainer} >
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
      </div>
    );
  }
}
export default ContractList;
