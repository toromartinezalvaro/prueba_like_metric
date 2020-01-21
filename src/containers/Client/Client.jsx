import React, { Component } from 'react';
import _ from 'lodash';
import ClientForm from '../../components/Client/ClientForm/ClientForm';
import ClientList from '../../components/Client/List';
import ClientsServices from '../../services/client/ClientsServices';
import SearchOrNewClient from '../../components/Client/SearchOrNew';
import { DashboardRoutes } from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';

const SAVE = 'save';
const ADD = 'add';
class Client extends Component {
  constructor(props) {
    super(props);
    this.services = new ClientsServices(this);
  }

  state = {
    isLoading: false,
    action: SAVE,
    currentClient: {
      identityDocument: '',
      name: '',
      email: '',
      phoneNumber: '',
      towers: null,
      hasCompanyAssociated: false,
      searchText: '',
      searchType: '',
    },
    isOpen: false,
    clients: [],
    clientAdded: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getClients(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ clients: response.data, isLoading: false });
      });
  }

  handleSave = (client, isGoingToSalesRoom) => {
    this.services
      .postClient(this.props.match.params.towerId, client)
      .then((response) => {
        const tempClients = [...this.state.clients];
        tempClients.push(response.data);
        this.setState({ clients: tempClients, isOpen: false });
        if (isGoingToSalesRoom) {
          this.goToSalesRoom(response.data.id);
        }
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
        towers: null,
        phoneNumber: '',
      },
      addClient: false,
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

  search = (text, type) => {
    const { towerId } = this.props.match.params;
    this.services
      .getClient(text, type, towerId)
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

  goToSalesRoomClient = (currentClient) => {
    this.goToSalesRoom(currentClient.id);
  };

  addClientToTower = (identityDocument) => {
    this.services
      .addClientToTower(identityDocument, this.props.match.params.towerId)
      .then((response) => {
        this.setState((prevState) => {
          const tempClients = [...prevState.clients];
          tempClients.push(response.data);
          return { clients: tempClients, clientAdded: true };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
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
          search={this.search}
          saveHandler={this.handleSave}
          updateHandler={this.handleUpdate}
          addHandler={this.handleAdd}
          action={this.state.action}
          goToSalesRoom={this.goToSalesRoomClient}
          addClientToTower={this.addClientToTower}
          clientAdded={this.state.clientAdded}
        />
      </LoadableContainer>
    );
  }
}

export default Client;
