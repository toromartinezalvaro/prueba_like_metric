/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './BusinessPatner.module.scss';

const BusinessPatner = ({
  handleCloseBusinessPatner,
  newBusinessPartner,
  updatePartner,
  informationToEdit,
  editable,
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
    if (informationToEdit) {
      setPartner(informationToEdit);
    }
  }, []);

  const onChangeInformation = (name) => (e) => {
    setPartner({ ...partner, [name]: e.target.value });
  };

  const onChangeSelect = (name) => (label) => {
    setPartner({ ...partner, [name]: label.value });
  };

  const sendPartner = () => {
    if (informationToEdit) {
      setPartner({ ...partner, id: informationToEdit.id });
      updatePartner(partner);
    }
    newBusinessPartner(partner);
    handleCloseBusinessPatner();
  };

  const Option = (props) => {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
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
          <TextField
            fullWidth
            className={styles.textField}
            label="Codigo postal"
            margin="normal"
            variant="outlined"
            value={partner.patnerPostalCode}
            onChange={onChangeInformation('patnerPostalCode')}
          />
        </div>
        <div className={styles.columnFullRigth}>
          <TextField
            fullWidth
            className={styles.textField}
            label="City"
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
            value={partner.patnerPhone}
            onChange={onChangeInformation('patnerPhone')}
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
          startIcon={<AddIcon />}
          onClick={sendPartner}
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

export default BusinessPatner;
