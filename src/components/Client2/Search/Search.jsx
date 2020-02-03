import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  fetchOptionsStart,
  fetchOptionsSuccess,
  fetchOptionsFailure,
} from './actions';
import reducer, { initialState } from './reducer';
import Input from './Input';
import Option from './Option/Option';
import Services from '../../../services/client/ClientsServices';

const services = new Services();

const Search = ({ onSelectHandler }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    async function fetchClients() {
      dispatch(fetchOptionsStart());
      try {
        const res = await services.searchClients(inputValue);
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
      </CardContent>
    </Card>
  );
};

Search.propTypes = {
  onSelectHandler: PropTypes.func.isRequired,
};

export default Search;
