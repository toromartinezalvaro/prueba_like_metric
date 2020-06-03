/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Fragment, useState, useEffect } from 'react';
import {
  TextField,
  Icon,
  Typography,
  MenuItem,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './BusinessPatner.module.scss';
import withDefaultLayout from '../../../../HOC/Layouts/Default/withDefaultLayout';

const BusinessPatner = ({
  handleCloseBusinessPatner,
  newBusinessPartner,
  updatePartner,
  informationToEdit,
  editable,
  spawnMessage,
}) => {
  const [partner, setPartner] = useState({
    patnerName: '',
    patnerAdress: '',
    patnerPostalCode: '',
    patnerCity: '',
    patnerCountry: '',
    patnerWebsite: '',
    patnerContactPerson: '',
    patnerEmail: '',
    patnerPhone: '',
    patnerFiscalInformation: '',
    patnerVatNumber: '',
  });

  useEffect(() => {
    if (informationToEdit && informationToEdit !== '') {
      setPartner(informationToEdit);
    }
  }, []);

  const [isShow, setShow] = useState(false);
  const [regex] = useState(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  const onChangeInformation = (name) => (e) => {
    setPartner({ ...partner, [name]: e.target.value });
  };

  const onChangeSelect = (name) => (label) => {
    setPartner({ ...partner, [name]: label.value });
  };

  const updateToSendPartner = () => {
    setPartner({ ...partner, id: informationToEdit.id });
    updatePartner(partner);
    handleCloseBusinessPatner();
  };

  const sendPartner = () => {
    if (regex.test(partner.patnerEmail) || partner.patnerEmail === '') {
      newBusinessPartner(partner);
      handleCloseBusinessPatner();
    } else {
      spawnMessage('Debe ingresar un email válido', 'error');
    }
  };

  const Option = (props) => {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        className={styles.itemMenu}
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  const suggestions = [
    { label: 'Colombia' },
    { label: 'Mexico' },
    { label: 'Chile' },
    { label: 'Brasil' },
    { label: 'Perú' },
  ].map((suggestion) => ({
    value: suggestion.label,
    label: suggestion.label,
  }));

  return (
    <Fragment>
      <Typography className={styles.headingTitle} variant="h4">
        <div className={`${styles.circleIcon}  ${styles.circleColorForTitle}`}>
          <Icon className={`${styles.iconGeneral} fas fa-handshake`} />
        </div>
        <div className={styles.titleExpandForTitle}>
          {informationToEdit !== undefined
            ? 'Editar Socio de Negocios'
            : 'Nuevo Socio de Negocios'}
        </div>
      </Typography>

      <Typography className={styles.heading}>
        <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
          <Icon className={`${styles.iconGeneral} fas fa-book-reader`} />
        </div>
        <div className={styles.titleExpand}>Nombre y Dirección</div>
      </Typography>

      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            required
            fullWidth
            className={styles.textField}
            label="Nombre"
            margin="normal"
            variant="outlined"
            value={partner.patnerName}
            onChange={onChangeInformation('patnerName')}
          />
          <TextField
            fullWidth
            className={styles.textField}
            label="Dirección"
            margin="normal"
            variant="outlined"
            value={partner.patnerAdress}
            onChange={onChangeInformation('patnerAdress')}
          />
          {isShow && (
            <TextField
              fullWidth
              className={styles.textField}
              label="Codigo postal"
              margin="normal"
              variant="outlined"
              value={partner.patnerPostalCode}
              onChange={onChangeInformation('patnerPostalCode')}
            />
          )}
        </div>
        <div className={styles.columnFullRigth}>
          <TextField
            fullWidth
            className={styles.textField}
            label="Municipio"
            margin="normal"
            variant="outlined"
            value={partner.patnerCity}
            onChange={onChangeInformation('patnerCity')}
          />
          <Select
            className={styles.Select}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'País',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            placeholder="Seleccione un país"
            options={suggestions}
            components={Option}
            value={{
              label: partner.patnerCountry,
              value: partner.patnerCountry,
            }}
            onChange={onChangeSelect('patnerCountry')}
          />
          <TextField
            fullWidth
            className={styles.textField}
            label="Sitio web"
            margin="normal"
            variant="outlined"
            value={partner.patnerWebsite}
            onChange={onChangeInformation('patnerWebsite')}
          />
        </div>
      </div>

      <Typography className={styles.heading}>
        <div className={`${styles.circleIcon}  ${styles.circleColorPeople}`}>
          <Icon className={`${styles.iconGeneral} fas fa-user-friends`} />
        </div>
        <div className={styles.titleExpand}>Persona de contacto</div>
      </Typography>

      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            fullWidth
            className={styles.textField}
            label="Persona de Contacto"
            margin="normal"
            variant="outlined"
            value={partner.patnerContactPerson}
            onChange={onChangeInformation('patnerContactPerson')}
          />
          <TextField
            fullWidth
            className={styles.textField}
            label="Email"
            margin="normal"
            variant="outlined"
            value={partner.patnerEmail}
            onChange={onChangeInformation('patnerEmail')}
          />
        </div>
        <div className={styles.columnFullRigth}>
          <TextField
            fullWidth
            className={styles.textField}
            label="Telefono"
            margin="normal"
            variant="outlined"
            type="Number"
            value={partner.patnerPhone}
            onChange={onChangeInformation('patnerPhone')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <Typography className={styles.heading}>
        <div
          className={`${styles.circleIcon}  ${styles.circleColorFinantials}`}
        >
          <Icon className={`${styles.iconGeneral}  fas fa-tag`} />
        </div>
        <div className={styles.titleExpand}>Información Financiera</div>
      </Typography>

      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            fullWidth
            className={styles.textField}
            label="Información Fiscal"
            margin="normal"
            variant="outlined"
            value={partner.patnerFiscalInformation}
            onChange={onChangeInformation('patnerFiscalInformation')}
          />
        </div>
        <div className={styles.columnFullRigth}>
          <TextField
            fullWidth
            className={styles.textField}
            label="Numero de RUT"
            margin="normal"
            variant="outlined"
            value={partner.patnerVatNumber}
            onChange={onChangeInformation('patnerVatNumber')}
          />
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          startIcon={
            informationToEdit !== undefined ? (
              <Icon className="fa fa-edit" />
            ) : (
              <AddIcon />
            )
          }
          onClick={
            informationToEdit !== undefined ? updateToSendPartner : sendPartner
          }
        >
          {informationToEdit !== undefined
            ? 'Editar Socio de negocios'
            : 'Agregar Socio de negocios'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={`${styles.button} ${styles.buttonMargin}`}
          startIcon={<Icon className="fas fa-ban" />}
          onClick={handleCloseBusinessPatner}
        >
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};
BusinessPatner.propTypes = {
  informationToEdit: PropTypes.object,
  editable: PropTypes.bool,
};

export default withDefaultLayout(BusinessPatner);