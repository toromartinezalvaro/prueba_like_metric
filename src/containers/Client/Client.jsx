import React, { Component } from 'react';
import ClientForm from '../../components/Client/ClientForm/ClientForm';
import ClientList from '../../components/Client/List';
import ClientsServices from '../../services/client/ClientsServices';
import SearchOrNewClient from '../../components/Client/SearchOrNew';
import { DashboardRoutes } from '../../routes/local/routes';

class Client extends Component {
  constructor(props) {
    super(props);
    this.services = new ClientsServices(this);
  }

  state = {
    currentClient: {},
    isOpen: true,
    genders: {},
    clientTypes: {},
  };

  componentDidMount() {
    this.services.getEnums(this.props.match.params.towerId).then((response) => {
      const { genders, clientTypes, modules } = response.data;
      this.setState({ genders, clientTypes, modules });
    });
  }

  genderHandler = (value) => {
    const tempClient = this.state.client;
    tempClient.gender = value;
    this.setState({ client: tempClient });
  };

  clientTypeHandler = (value) => {
    const tempClient = this.state.client;
    tempClient.clientType = value;
    this.setState({ client: tempClient });
  };

  clientHandler = (target) => {
    console.log(target);
    const tempClient = this.state.client;
    tempClient[target.name] = target.value;
    this.setState({ client: tempClient });
  };

  saveClient = () => {
    this.services
      .postClient(this.state.client)
      .then((results) => {
        console.log('OK');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleCloseDialog = () => {
    this.setState({ isOpen: false });
  };

  openSearchAndEdit = () => {
    this.setState({
      isOpen: true,
    });
  };

  goToSalesRoom = (clientId) => {
    const { towerId } = this.props.match.params;
    this.props.history.push(
      `${DashboardRoutes.base +
        DashboardRoutes.salesRoomClient.value +
        towerId}/${clientId}`,
    );
  };

  searchNumber = (idNumber) => {
    console.log("idNumber", idNumber)
  }

  render() {
    return (
      <div>
        <ClientList openSearchAndEdit={this.openSearchAndEdit} />
        <SearchOrNewClient
          open={this.state.isOpen}
          handleClose={this.handleCloseDialog}
          clientInfo={this.state.currentClient}
          pushToSalesRoom={this.goToSalesRoom}
          searchNumber={this.searchNumber}
        />
      </div>
    );
  }
}

export default Client;
