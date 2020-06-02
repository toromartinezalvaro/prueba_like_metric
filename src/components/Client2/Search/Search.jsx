import React, { useState, useReducer, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  fetchOptionsStart,
  fetchOptionsSuccess,
  fetchOptionsFailure,
} from './actions';
import reducer, { initialState } from './reducer';
import Input from './Input';
import Option from './Option/Option';
import Services from '../../../services/client/ClientsServices';
import ContainerContext from '../../../containers/Client/context';

const services = new Services();

const defaultClient = {
  id: null,
  name: '',
  identityDocument: '',
  properties: [],
};

const Search = ({ onSelectHandler }) => {
  const { towerId } = useContext(ContainerContext);
  const [inputValue, setInputValue] = useState('');
  const [options, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    async function fetchClients() {
      dispatch(fetchOptionsStart());
      try {
        const res = await services.searchClients(towerId, inputValue);
        if (active) {
          dispatch(fetchOptionsSuccess(res.data, inputValue));
        }
      } catch (error) {
        dispatch(fetchOptionsFailure());
      }
    }
    fetchClients();
    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Autocomplete
            noOptionsText="No hay clientes"
            loading={options.isLoading}
            loadingText="Obteniendo clientes..."
            filterOptions={(x) => x}
            options={options.list}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <Input
                params={params}
                onChangeHandler={(event) => {
                  setInputValue(event.target.value);
                }}
              />
            )}
            renderOption={(option, { innerInputValue }) => (
              <Option value={option} inputValue={innerInputValue} />
            )}
            onChange={(_, value) => {
              onSelectHandler(value);
            }}
          />
        </Box>
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              onClick={() => {
                onSelectHandler(defaultClient);
              }}
              variant="contained"
              color="primary"
            >
              Crear cliente
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Search.propTypes = {
  onSelectHandler: PropTypes.func.isRequired,
};

export default Search;
