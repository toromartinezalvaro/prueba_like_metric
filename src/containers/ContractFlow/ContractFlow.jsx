import React, { Component } from 'react';
import Table from '../../UI/Table/Table';
import Style from './ContractFlow.module.scss';

class ContractFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Contratos: '',
    };
  }

  componentDidMount() {
    this.setState({ Contratos: 'Flujo' });
  }

  render() {
    return (
      <Table
        intersect={'Areas'}
        headers={['Precio']}
        columns={this.state.Contratos}
        data={[0, 1, 2, 3, 4]}
        maxHeight={{ maxHeight: '36vh' }}
      />
    );
  }
}

export default ContractFlow;
