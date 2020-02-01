import React, { useReducer, useState, useEffect } from 'react';
import {
  fetchClientsSuccess,
  fetchClientsFailure,
  fetchClientsStart,
  createClient,
  updateClient,
  addClient,
} from './actions';
import reducer, { initialState } from './reducer';
import ClientSearch from '../../components/Client2/Search';
import ClientList from '../../components/Client2/List';
import ClientFormDialog from '../../components/Client2/FormDialog';
import ClientDetailsDialog from '../../components/Client2/DetailsDialog';
import Services from '../../services/client/ClientsServices';
import ContainerContext from './context';
import Styles from './Client.module.scss';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

const services = new Services();
const Client = (props) => {
  const [isOpen, setIsOpen] = useState({ form: false, detail: false });
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
    <ContainerContext.Provider
      value={{
        towerId: props.match.params.towerId,
        dispatch,
        createClient,
        updateClient,
        addClient,
        makeAlert: props.spawnMessage,
        isOpen,
        setIsOpen,
        setSelectedClient,
      }}
    >
      <div className={Styles.container}>
        <div>
          <ClientSearch
            onSelectHandler={(client) => {
              setIsOpen({ ...isOpen, form: true });
              setSelectedClient(client);
            }}
          />
        </div>
        <div className={Styles.list}>
          <ClientList clients={clients.list} isLoading={clients.isLoading} />
        </div>
      </div>
      <ClientFormDialog
        open={isOpen.form}
        client={selectedClient}
        onCloseHandler={() => {
          setIsOpen({ ...isOpen, form: false });
          setSelectedClient(null);
        }}
      />
      {/* <ClientDetailsDialog
        client={selectedClient}
        towerId={props.match.params.towerId}
        handleClose={() => {
          setIsOpen({ ...isOpen, detail: false });
          setSelectedClient(null);
        }}
      /> */}
    </ContainerContext.Provider>
  );
};

export default withDefaultLayout(Client);
