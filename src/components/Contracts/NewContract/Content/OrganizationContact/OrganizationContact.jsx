/*
 * Created by Jcatman on Fri Nov 07 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Select, { components } from 'react-select';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import OrganizationUnit from './organizationUnit/organizationUnit';
import ContractService from '../../../../../services/contract/contractService';

import styles from './OrganizationContact.module.scss';

const Option = (props) => {
  return <components.Option {...props} className={styles.options} />;
};

const OrganizationContact = () => {

  const [organizationModal, setOrganizationModal] = useState({
    isOpen: false,
    isEditable: false,
    editableInfo: {},
    currentOrganization: undefined,
  });

  const [organizationContacts, setOrganizationContacts] = useState({
    businessUnit: '',
    contractOwner: '',
    organizationUnit: '',
    additionalContact: '',
  });

  const [organizations, setOrganizations] = useState([]);

  const searchOrganization = (organizationToSearch) => {
    ContractService
      .getOrganizationUnitById(organizationToSearch)
      .then((response) => {
        setOrganizationModal({
          ...organizationModal, editableInfo: response.data, isOpen: true
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchForOrganization = () => {
    if (organizationModal.currentOrganization.value !== '') {
      searchOrganization(organizationModal.currentOrganization.value);
    }
  };

  const handleOpenOrClose = () => {
    setOrganizationModal({ isOpen: !organizationModal.isOpen });
  }

  const isChanged = (name) => (label) => {
    setOrganizationContacts({ ...organizationContacts, [name]: label.value });
  }

  const isChangedText = (name) => (e) => {
    setOrganizationContacts({ ...organizationContacts, [name]: e.target.value });
  }

  const newOrganization = (organizationName) => {
    ContractService
      .postOrganizationUnit({ organizationName })
      .then((response) => {
        const currentOrganization = {
          value: response.data.id,
          label: response.data.organizationName,
        };
        setOrganizations(currentOrganization);
        setOrganizationModal(...organizationModal, currentOrganization);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateOrganization = (id, organizationName, contractId) => {
    ContractService
      .putOrganizationUnit(id, organizationName, contractId)
      .then((response) => {
        const index = organizations.findIndex(
          (category) => category.value === response.data.id,
        );
        let temporal = organizations;
        const currentOrganization = {
          value: response.data.id,
          label: response.data.organizationName,
        };
        temporal[index] = currentOrganization;
        setOrganizations(temporal);
        setOrganizationModal(...organizationModal, currentOrganization);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={styles.gridContainer}>
      <div className={styles.columnFullLeft}>
        <div className={styles.selectColumnAlone}>
          <Select
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Unidad De Negocio',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            onChange={isChanged('businessUnit')}
            placeholder="Unidad De Negocio"
            components={Option}
          />
        </div>
        <div className={styles.selectColumnAlone}>
          <Select
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Dueño Del Contrato',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
            }}
            onChange={isChanged('contractOwner')}
            placeholder="Dueño Del Contrato"
            components={Option}
          />
        </div>
      </div>
      <div className={styles.columnFullRigth} >
        <div className={styles.colmn}>
          <div className={styles.gridSubContainer}>
            <div className={styles.selectColumn}>
              <Select
                inputId="react-select-single"
                TextFieldProps={{
                  label: 'Unidad Organizacional',
                  InputLabelProps: {
                    htmlFor: 'react-select-single',
                    shrink: true,
                  },
                }}
                placeholder="Unidad Organizacional"
                onChange={isChanged('organizationUnit')}
                components={Option}
              />
            </div>
            <div className={styles.buttonColumn}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                className={styles.fab}
                onClick={handleOpenOrClose}
              >
                <AddIcon />
              </Fab>
              <Fab
                color="secondary"
                mx={2}
                size="small"
                aria-label="edit"
                onClick={searchForOrganization}
                className={styles.fab}
              >
                <EditIcon />
              </Fab>
            </div>
            <TextField
              className={styles.leftInputs}
              label="Persona Adicional De Contacto"
              margin="normal"
              onChange={isChangedText('additionalContact')}
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <Dialog
        className={styles.dialogExpand}
        scroll="body"
        open={organizationModal.isOpen}
        handleCloseCategory={handleOpenOrClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent>
          <OrganizationUnit
            handleOpenOrClose={handleOpenOrClose}
            newOrganization={newOrganization}
            updateCategory={updateOrganization}
            editable={organizationModal.isEditable}
            informationToEdit={organizationModal.editableInfo} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationContact;
