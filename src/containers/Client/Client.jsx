import React, { Component } from 'react';
import ClientForm from '../../components/Client/ClientForm/ClientForm';
import ClientsServices from '../../services/client/ClientsServices';

class Client extends Component {
  constructor(props) {
    super(props);
    this.services = new ClientsServices(this);
  }

  state = {
    genders: {},
    clientTypes: {},
  };

  componentDidMount() {
    this.services.getEnums().then(response => {
      const { genders, clientTypes } = response.data;
      this.setState({ genders, clientTypes });
    });
  }

  render() {
    return (
      <ClientForm
        genders={this.state.genders}
        clientTypes={this.state.clientTypes}
      />
    );
  }
}

export default Client;
