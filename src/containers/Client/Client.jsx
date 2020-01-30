import React, { Fragment, useReducer, useState, useEffect } from 'react';
import {
  fetchClientsSuccess,
  fetchClientsFailure,
  fetchClientsStart,
} from './actions';
import reducer, { initialState } from './reducer';
import ClientSearch from '../../components/Client2/Search';
import ClientList from '../../components/Client2/List';
import ClientFormDialog from '../../components/Client2/FormDialog';
import Services from '../../services/client/ClientsServices';
import ContainerContext from './context';
import Styles from './Client.module.scss';

const services = new Services();
const Client = (props) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchClientsStart());
        const res = await services.getClients(props.match.params.towerId);
        dispatch(fetchClientsSuccess(res.data));
      } catch (error) {
        dispatch(fetchClientsFailure());
      }
    }
    fetchData();
    return () => null;
  }, []);

  return (
    <Fragment>
      <div className={Styles.container}>
        <div>
          <ClientSearch onSelectHandler={setSelectedClient} />
        </div>
        <div className={Styles.list}>
          <ContainerContext.Provider
            value={{ towerId: props.match.params.towerId }}
          >
            <ClientList clients={clients.list} isLoading={clients.isLoading} />
          </ContainerContext.Provider>
        </div>
      </div>
      <ClientFormDialog client={selectedClient} />
    </Fragment>
  );
};

export default Client;
