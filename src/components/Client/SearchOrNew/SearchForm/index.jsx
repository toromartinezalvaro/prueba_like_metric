import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Styles from './SearchClientForm.module.scss';

const SearchClientForm = ({ client, handleChange, isEditing }) => {
  return (
    <div className={Styles.Container}>
      <TextField
        className={Styles.TextField}
        disabled={isEditing}
        label="# Documento"
        value={client.identityDocument}
        onChange={handleChange('identityDocument')}
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
  client: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default SearchClientForm;
