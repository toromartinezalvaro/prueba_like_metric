import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from './Input';
import Option from './Option/Option';

const Search = () => {
  const [options] = useState([
    { identityDocument: 123456, name: 'Jhon Doe' },
    { identityDocument: 7890, name: 'Jane Doe' },
  ]);

  return (
    <Card>
      <CardContent>
        <Autocomplete
          noOptionsText="Agregar cliente"
          loadingText="Buscando clientes..."
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <Input params={params} />}
          renderOption={(option) => <Option value={option} />}
        />
      </CardContent>
    </Card>
  );
};

export default Search;
