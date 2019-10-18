import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { isStatement } from '@babel/types';
import Styles from './SearchClientForm.module.scss';

const SearchClientForm = ({ client, handleChange, isEditing }) => {
  return (
    <div className={Styles.Container}>
      <TextField
        className={Styles.TextField}
        disabled={isEditing}
        label="# Documento"
        value={client.documentNumber}
        onChange={handleChange('documentNumber')}
      />
      <div className={isEditing ? Styles.Enabled : Styles.Disabled}>
        <TextField
          className={Styles.TextField}
          label="Nombre"
          value={client.name}
          onChange={handleChange('name')}
        />
        <TextField
          className={Styles.TextField}
          label="Correo"
          type="email"
          value={client.email}
          onChange={handleChange('email')}
        />
        <TextField
          className={Styles.TextField}
          label="Número de celular"
          value={client.phoneNumber}
          onChange={handleChange('phoneNumber')}
        />
      </div>
    </div>
  );
};

SearchClientForm.propTypes = {
  openSearchAndEdit: PropTypes.func.isRequired,
  //   name: PropTypes.string.isRequired,
  //   percentage: PropTypes.number.isRequired,
  //   updateHandler: PropTypes.func.isRequired,
  //   deleteHandler: PropTypes.func.isRequired,
};

export default SearchClientForm;
