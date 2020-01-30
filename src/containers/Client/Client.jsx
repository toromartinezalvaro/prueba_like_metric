import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { SAVE, ADD } from './actions';
import ClientSearch from '../../components/Client2/Search';
import ClientList from '../../components/Client2/List';
import ClientModal from '../../components/Client2/Modal';
import Styles from './Client.module.scss';

class Client extends Component {
  state = {
    clients: [],
  };

  render() {
    return (
      <Fragment>
        <div className={Styles.container}>
          <div>
            <ClientSearch />
          </div>
          <div className={Styles.list}>
            <ClientList clients={this.state.clients} />
          </div>
        </div>
        <ClientModal />
      </Fragment>
    );
  }
}

export default Client;
