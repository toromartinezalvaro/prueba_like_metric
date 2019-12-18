import React, { Component } from 'react';

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
    return <h1>{this.state.Contratos}</h1>;
  }
}

export default ContractFlow;
