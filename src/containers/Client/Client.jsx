import React, { Component } from 'react';
import ClientForm from '../../components/Client/ClientForm/ClientForm';
import ClientsServices from '../../services/client/ClientsServices';

class Client extends Component {
  constructor(props) {
    super(props);
    this.services = new ClientsServices(this);
  }

  state = {
    client: {
      gender: null,
      clientType: null,
      identityDocument: null,
      socialReason: null,
      name: null,
      surname: null,
      phoneNumber: null,
      mobileNumber: null,
      email: null,
      city: null,
      module: null,
    },
    genders: {},
    clientTypes: {},
  };

  componentDidMount() {
    this.services.getEnums().then(response => {
      const { genders, clientTypes } = response.data;
      this.setState({ genders, clientTypes });
    });
  }

  clientHandler = event => {
    const tempClient = this.state.client;
    tempClient[event.target.name] = event.target.value;
    this.setState({ client: tempClient });
  };

  saveClient = () => {
    console.log(this.state.client);
    //this.services.postClient(this.state.client);
  };

  render() {
    return (
      <ClientForm
        genders={this.state.genders}
        clientTypes={this.state.clientTypes}
        clientHandler={this.clientHandler}
        saveClient={this.saveClient}
      />
    );
  }
}

export default Client;
