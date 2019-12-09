/*
 * Created by Jcatman on Fri Nov 07 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import { TextField, Fab, Dialog, DialogContent } from '@material-ui/core';
import { AddIcon } from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import OrganizationUnit from './organizationUnit/organizationUnit';
import ContractService from '../../../../../services/contract/contractService';

import styles from './OrganizationContact.module.scss';

const Option = (props) => {
  return <components.Option {...props} className={styles.options} />;
};

class OrganizationContact extends Component {
  constructor(props) {
    super(props);
    this.service = new ContractService();
    this.state = {
      organizationModal: {
        isOpen: false,
        isEditable: false,
        editableInfo: {},
        currentOrganization: undefined,
      },
      organizationContacts: {
        businessUnit: '',
        contractOwner: '',
        organizationUnit: '',
        additionalContact: '',
      },
      organizations: [],
      toEdit: '',
    };
  }

  componentDidMount() {
    this.service
      .getAllOrganizationUnit()
      .then((response) => {
        const organizations = response.data.map((organization) => {
          return {
            value: organization.id,
            label: organization.name,
          };
        });
        this.setState({
          organizations,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleOpenOrClose = () => {
    this.setState({
      organizationModal: { isOpen: !this.state.organizationModal.isOpen },
    });
  };

  isChanged = (name) => (label) => {
    this.setState({
      organizationContacts: {
        ...this.state.organizationContacts,
        [name]: label.value,
      },
      organizationModal: {
        ...this.state.organizationModal,
        currentOrganization: label.name,
      },
      toEdit: label.value,
    });
  };

  isChangedText = (name) => (e) => {
    this.setState({
      ...this.state.organizationContacts,
      [name]: e.target.value,
    });
  };

  searchForOrganization = () => {
    if (this.state.organizationModal.currentOrganization !== '') {
      this.service
        .getOrganizationUnitById(this.state.toEdit)
        .then((response) => {
          this.setState({
            organizationModal: {
              ...this.state.organizationModal,
              editableInfo: response.data,
              isOpen: true,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  newOrganization = (name) => {
    this.service
      .postOrganizationUnit(name)
      .then((response) => {
        const currentOrganization = {
          value: response.data.id,
          label: response.data.name,
        };
        this.setState({
          organizations: [...this.state.organizations, currentOrganization],
          organizationModal: {
            ...this.state.organizationModal,
            currentOrganization,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateOrganization = (data) => {
    this.service
      .putOrganizationUnit(data)
      .then((response) => {
        const index = this.state.organizations.findIndex(
          (category) => category.value === response.data.id,
        );
        const temporal = this.state.organizations;
        const currentOrganization = {
          value: response.data.id,
          label: response.data.name,
        };
        temporal[index] = currentOrganization;
        this.setState({ organizations: temporal });
        this.setState({
          organizationModal: {
            ...this.state.organizationModal,
            currentOrganization,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className={styles.gridContainer}>
        <div className={styles.columnFullLeft}>
          <TextField
            className={styles.TextField}
            label="Unidad De Negocio"
            margin="normal"
            onChange={this.isChangedText('businessUnit')}
            variant="outlined"
          />
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
              onChange={this.isChanged('contractOwner')}
              placeholder="Dueño Del Contrato"
              components={Option}
            />
          </div>
        </div>
        <div className={styles.columnFullRigth}>
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
                  onChange={this.isChanged('organizationUnit')}
                  components={Option}
                  value={this.state.organizationModal.currentOrganization}
                  options={this.state.organizations}
                />
              </div>
              <div className={styles.buttonColumn}>
                <Fab
                  color="primary"
                  size="small"
                  aria-label="add"
                  className={styles.fab}
                  onClick={this.handleOpenOrClose}
                >
                  <AddIcon />
                </Fab>
                <Fab
                  color="secondary"
                  mx={2}
                  size="small"
                  aria-label="edit"
                  onClick={this.searchForOrganization}
                  className={styles.fab}
                >
                  <EditIcon />
                </Fab>
              </div>
              <TextField
                className={styles.leftInputs}
                label="Persona Adicional De Contacto"
                margin="normal"
                onChange={this.isChangedText('additionalContact')}
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.organizationModal.isOpen}
          handleCloseCategory={this.handleOpenOrClose}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogContent>
            <OrganizationUnit
              handleOpenOrClose={this.handleOpenOrClose}
              newOrganization={this.newOrganization}
              updateOrganization={this.updateOrganization}
              editable={this.state.organizationModal.isEditable}
              informationToEdit={this.state.organizationModal.editableInfo}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
OrganizationContact.propTypes = {
  searchOrganization: PropTypes.func,
};
export default OrganizationContact;
