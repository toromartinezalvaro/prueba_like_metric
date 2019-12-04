import React, { Component } from 'react';
import ContractService from '../../../services/contract/contractService';
import style from './ContractList.module.scss';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: '',
    };
    this.services = new ContractService();
  }

  componentDidMount() {
    this.services
      .getAllContracts(this.props.towerId)
      .then((contracts) => {
        this.setState({ contracts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayData = () => {
    console.log(this.state.contracts.data);
    /*     return this.state.contracts.map((contract) => {
      return <div className={style.dataContainer} key={contract.id}></div>;
    }); */
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
