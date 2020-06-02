import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Styles from './SearchClientForm.module.scss';

const SEARCH_NAME = 'name';
const SEARCH_DOCUMENT = 'document';
const SEARCH_PROPERTY = 'property';
const SAVE = 'save';
const ADD = 'add';

const SearchClientForm = ({
  client,
  searchCriteriaHandler,
  searchCriteria,
  handleChange,
  isEditing,
  action,
}) => {
  return (
    <div className={Styles.Container}>
      {!isEditing && (
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Buscar por:</FormLabel>
            <RadioGroup
              aria-label="Tipo de busqueda"
              name="Tipo de busqueda"
              onChange={searchCriteriaHandler('type')}
              value={searchCriteria.type}
              row
            >
              <FormControlLabel
                value={SEARCH_DOCUMENT}
                control={<Radio />}
                label="Cédula "
              />
              <FormControlLabel
                value={SEARCH_NAME}
                control={<Radio />}
                label="Nombre"
              />
              <FormControlLabel
                value={SEARCH_PROPERTY}
                control={<Radio />}
                label="Número de apartamento"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            className={Styles.TextField}
            label="Criterio de busqueda"
            value={searchCriteria.text}
            onChange={searchCriteriaHandler('text')}
          />
        </div>
      )}

      <div className={isEditing ? Styles.Enabled : Styles.Disabled}>
        <TextField
          className={Styles.TextField}
          disabled={action === ADD}
          label="# Documento"
          value={client.identityDocument}
          onChange={handleChange('identityDocument')}
        />
        <TextField
          className={Styles.TextField}
          label="Nombre"
          value={client.name}
          onChange={handleChange('name')}
        />
        <TextField
          error={
            client.email
              ? !/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
                  client.email,
                )
              : false
          }
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
  searchCriteria: PropTypes.exact({
    text: PropTypes.string,
    type: PropTypes.string,
  }),
  searchCriteriaHandler: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  action: PropTypes.oneOf([SAVE, ADD]),
};

export default SearchClientForm;
