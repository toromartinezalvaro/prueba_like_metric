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
    modules: [],
    genders: {},
    clientTypes: {},
  };

  componentDidMount() {
    this.services.getEnums(this.props.match.params.towerId).then(response => {
      const { genders, clientTypes, modules } = response.data;
      this.setState({ genders, clientTypes, modules });
    });
  }

  genderHandler = value => {
    const tempClient = this.state.client;
    tempClient.gender = value;
    this.setState({ client: tempClient });
  };

  clientTypeHandler = value => {
    const tempClient = this.state.client;
    tempClient.clientType = value;
    this.setState({ client: tempClient });
  };

  clientHandler = target => {
    console.log(target);
    const tempClient = this.state.client;
    tempClient[target.name] = target.value;
    this.setState({ client: tempClient });
  };

  saveClient = () => {
    this.services
      .postClient(this.state.client)
      .then(results => {
        console.log('OK');
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <ClientForm
        genderHandler={this.genderHandler}
        clientTypeHandler={this.clientTypeHandler}
        modules={this.state.modules}
        genders={this.state.genders}
        clientTypes={this.state.clientTypes}
        clientHandler={this.clientHandler}
        saveClient={this.saveClient}
      />
    );
  }
}

export default Client;
