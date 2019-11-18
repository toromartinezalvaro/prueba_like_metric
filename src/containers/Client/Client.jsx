import React, { Component } from 'react';
import _ from 'lodash';
import ClientForm from '../../components/Client/ClientForm/ClientForm';
import ClientList from '../../components/Client/List';
import ClientsServices from '../../services/client/ClientsServices';
import SearchOrNewClient from '../../components/Client/SearchOrNew';
import { DashboardRoutes } from '../../routes/local/routes';

const SAVE = 'save';
const ADD = 'add';
class Client extends Component {
  constructor(props) {
    super(props);
    this.services = new ClientsServices(this);
  }

  state = {
    action: SAVE,
    currentClient: {
      identityDocument: '',
      name: '',
      email: '',
      phoneNumber: '',
    },
    isOpen: false,
    clients: [],
  };

  componentDidMount() {
    this.services
      .getClients(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ clients: response.data });
      });
  }

  handleSave = (client) => {
    this.services
      .postClient(this.props.match.params.towerId, client)
      .then((response) => {
        const tempClients = [...this.state.clients];
        tempClients.push(response.data);
        this.setState({ clients: tempClients, isOpen: false });
      });
  };

  handleUpdate = (client) => {
    this.services
      .putClient(
        client.identityDocument,
        this.props.match.params.towerId,
        client,
      )
      .then((response) => {
        const tempClients = [...this.state.clients];
        const clientIndex = _.findIndex(
          tempClients,
          (e) => e.identityDocument === client.identityDocument,
        );
        if (clientIndex !== -1) {
          tempClients[clientIndex] = response.data;
          this.setState({ clients: tempClients, isOpen: false });
        }
      });
  };

  handleAdd = (client) => {
    this.services
      .addClient(this.props.match.params.towerId, client)
      .then((response) => {
        if (!_.find(this.state.clients, (o) => o.id === response.data.id)) {
          const tempClients = [...this.state.clients];
          tempClients.push(response.data);
          this.setState({ clients: tempClients, isOpen: false });
        } else {
          this.setState({ isOpen: false });
        }
      });
  };

  handleCloseDialog = () => {
    this.setState({
      isOpen: false,
      currentClient: {
        identityDocument: '',
        name: '',
        email: '',
        phoneNumber: '',
      },
    });
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
    this.services
      .getClient(idNumber)
      .then((response) => {
        this.setState({ currentClient: response.data, action: ADD });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({ action: SAVE });
        } else {
          console.error(error);
        }
      });
  };

  render() {
    return (
      <div>
        <ClientList
          towerId={this.props.match.params.towerId}
          openSearchAndEdit={this.openSearchAndEdit}
          clients={this.state.clients}
        />
        <SearchOrNewClient
          open={this.state.isOpen}
          clientInfo={this.state.currentClient}
          handleClose={this.handleCloseDialog}
          pushToSalesRoom={this.goToSalesRoom}
          searchNumber={this.searchNumber}
          saveHandler={this.handleSave}
          updateHandler={this.handleUpdate}
          addHandler={this.handleAdd}
          action={this.state.action}
        />
      </div>
    );
  }
}

export default Client;
