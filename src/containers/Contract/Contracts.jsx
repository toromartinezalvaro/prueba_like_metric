/*
 * Created on Tue Oct 22 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */
import { ClickAwayListener, Dialog, DialogContent } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './Contracts.module.scss';
import Navbar from '../../components/Contracts/Navbar/Navbar';
import NewContract from '../../components/Contracts/NewContract/NewContract';
import Category from '../../components/Contracts/NewContract/Content/Category/Category';
import statusOfContractEnum from '../../components/Contracts/NewContract/Content/GeneralInfo/statusOfContract.enum';
import BusinessPatner from '../../components/Contracts/NewContract/BusinessPatner/BusinessPatner';
import ContractService from '../../services/contract/contractService';
import Item from '../../components/Contracts/NewContract/Content/Item/Item';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';
import EventService from '../../services/event/EventServices';
import LoadingContract from '../../components/Contracts/LoadingContract';

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.eventService = new EventService();
    this.services = new ContractService();
    this.state = {
      categoryModal: {
        isOpen: false,
        isEditable: false,
        editableInfo: undefined,
        currentCategory: undefined,
      },
      contractModal: {
        isOpen: false,
        isLoading: false,
        data: {},
        contractId: null,
        generalInformationData: {
          title: '',
          businessPartnerId: '',
          groupId: '',
          state: '',
          contractNumber: '',
          itemId: '',
          description: '',
          billings: [],
          attachments: [],
        },
      },
      businessPatnerModal: {
        isOpen: false,
        isEditable: false,
        editableInfo: undefined,
        currentPatner: undefined,
      },
      itemModal: {
        isOpen: false,
        isEditable: false,
        isLocked: true,
        editableInfo: undefined,
        currentItem: undefined,
      },
      expanded: 'GeneralInfo',
      categories: [],
      partners: [],
      items: [],
      currentGroupId: '',
      events: [],
      billings: [],
      generalInformation: {},
      attachments: [],
      attachmentPath: '',
      contract: null,
      contractId: null,
      contractNumber: null,
      currentContract: null,
      alert: {
        opened: false,
        message: '',
      },
      isEditable: false,
      billsToDelete: [],
      alreadyCreated: false,
      errors: {
        title: false,
        description: false,
        contractNumber: false,
        partner: '',
        group: '',
        state: '',
        item: '',
      },
      attachmentData: undefined,
      urlsLoaded: [],
      urlToSend: undefined,
    };
  }

  componentDidMount() {
    this.services
      .getAllCategories(this.props.match.params.towerId)
      .then((response) => {
        const categories = response.data.map((category) => {
          return {
            value: category.id,
            label: category.categoryName,
          };
        });
        this.setState({
          categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.services
      .getAllPatners(this.props.match.params.towerId)
      .then((response) => {
        const partners = response.data.map((partner) => {
          return {
            value: partner.id,
            label: partner.patnerName,
          };
        });
        this.setState({
          partners,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.eventService
      .getAll(this.props.match.params.towerId)
      .then((response) => {
        const events = response.data.map((event) => {
          return {
            eventId: event.id,
            value: event.customDate,
            label: event.description,
          };
        });
        events.unshift({
          eventId: 0,
          value: 0,
          label: 'FECHA MANUAL',
        });
        this.setState({ events });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCloseContract = () => {
    this.setState({
      businessPatnerModal: {
        ...this.state.businessPatnerModal,
        currentPatner: { value: 0, label: 'Seleccione un socio' },
      },
      itemModal: {
        ...this.state.itemModal,
        currentItem: { value: 0, label: 'Seleccione un item' },
      },
      categoryModal: {
        ...this.state.categoryModal,
        currentCategory: { value: 0, label: 'Seleccione un grupo' },
      },
      contractModal: {
        ...this.state.categoryModal,
        isOpen: false,
        contract: { generalInformationData: false },
      },
      generalInformation: {
        title: '',
        businessPartnerId: 0,
        groupId: '',
        state: '',
        contractNumber: '',
        itemId: '',
        description: '',
        itemLabel: 'Seleccione un item',
      },
      isEditable: false,
      attachmentData: undefined,
      urlsLoaded: [],
      urlToSend: undefined,
    });
  };

  handleCloseCategory = () => {
    this.setState({
      categoryModal: {
        isEditable: false,
        editableInfo: undefined,
        currentCategory: 'Selecciona un Grupo',
      },
    });
  };

  handleCloseBusinessPatner = () => {
    this.setState({
      businessPatnerModal: {
        isEditable: false,
        editableInfo: undefined,
        currentPatner: 'Seleccione un Socio',
      },
    });
  };

  handleCloseItem = () => {
    this.setState({
      itemModal: {
        isEditable: false,
        editableInfo: undefined,
        currentItem: { value: 0, label: 'Selecciona un Item' },
      },
    });
  };

  handleOpenContract = () => {
    this.setState({
      contractModal: { isOpen: true, generalInformationData: null },
    });
    this.sendErrorInProp('title', false);
    this.sendErrorInProp('partner', '');
    this.sendErrorInProp('group', '');
    this.sendErrorInProp('state', '');
    this.sendErrorInProp('item', '');
    this.sendErrorInProp('contractNumber', false);
    this.sendErrorInProp('description', false);
  };

  handleOpenCategory = () => {
    this.setState({
      categoryModal: { ...this.state.categoryModal, isOpen: true },
    });
  };

  handleOpenBusinessPatner = () => {
    this.setState({
      businessPatnerModal: { ...this.state.businessPatnerModal, isOpen: true },
    });
  };

  handleOpenItem = () => {
    this.setState({
      itemModal: { ...this.state.itemModal, isOpen: true },
    });
  };

  enableEditable = () => {
    this.setState({ catagoryModal: { isEditable: true } });
  };

  disableEditable = () => {
    this.setState({
      categoryModal: { ...this.state.categoryModal, isEditable: false },
    });
  };

  currentGroupId = (group) => {
    this.setState({ currentGroupId: group });
  };

  newCategory = (categoryName) => {
    if (categoryName !== '') {
      this.services
        .postCategoryContracts(
          { categoryName },
          this.props.match.params.towerId,
        )
        .then((response) => {
          const currentCategory = {
            value: response.data.id,
            label: response.data.categoryName,
          };
          this.setState({
            categories: [...this.state.categories, currentCategory],
            categoryModal: { ...this.state.categoryModal, currentCategory },
          });
        })
        .catch((error) => {
          this.props.spawnMessage('Error al crear un grupo', 'error', 'ERROR');
        });
    } else {
      this.props.spawnMessage(
        'Debes agregar un nombre para crear un grupo',
        'error',
        'ERROR',
      );
    }
  };

  newBusinessPartner = (partner) => {
    if (partner.patnerName !== '') {
      this.services
        .postBusinessPatnerContract(partner, this.props.match.params.towerId)
        .then((response) => {
          const currentPatner = {
            value: response.data.id,
            label: response.data.patnerName,
          };
          this.setState({
            contractModal: {
              ...this.state.contractModal,
              data: { patner: currentPatner },
            },
            businessPatnerModal: {
              ...this.state.businessPatnerModal,
              currentPatner,
            },
            partners: [...this.state.partners, currentPatner],
          });
        })
        .catch((error) => {
          this.props.spawnMessage('Error al crear un socio', 'error', 'ERROR');
        });
    } else {
      this.props.spawnMessage(
        'Debes agregar un nombre para crear un socio',
        'error',
        'ERROR',
      );
    }
  };

  newItem = (name) => {
    if (name !== '') {
      this.services
        .postItem({ name, contractCategoryId: this.state.currentGroupId })
        .then((response) => {
          const currentItem = {
            value: response.data.id,
            label: response.data.name,
          };
          this.setState({
            items: [...this.state.items, currentItem],
            itemModal: { ...this.state.itemModal, currentItem },
          });
        })
        .catch((error) => {
          this.props.spawnMessage('Error al crear un item', 'error', 'ERROR');
        });
    } else {
      this.props.spawnMessage(
        'Debes agregar un nombre para crear un item',
        'error',
        'ERROR',
      );
    }
  };

  updateCategory = (id, categoryName, contractId) => {
    this.services
      .putCategoryContracts(id, categoryName, contractId)
      .then((response) => {
        const index = this.state.categories.findIndex(
          (category) => category.value === response.data.id,
        );
        let temporal = this.state.categories;
        const currentCategory = {
          value: response.data.id,
          label: response.data.categoryName,
        };
        temporal[index] = currentCategory;
        this.setState({
          categories: temporal,
          categoryModal: { ...this.state.categoryModal, currentCategory },
        });
      })
      .catch((error) => {
        this.props.spawnMessage(
          'No se puede actualizar el grupo',
          'error',
          'ERROR',
        );
      });
  };

  updatePartner = (editable) => {
    this.services
      .putBusinessPartner(editable)
      .then((response) => {
        const index = this.state.partners.findIndex(
          (partners) => partners.value === response.data.id,
        );
        let temporal = this.state.partners;
        temporal[index] = {
          value: response.data.id,
          label: response.data.patnerName,
        };
        this.setState({
          partners: temporal,
          businessPatnerModal: { isEditable: false },
        });
        this.props.spawnMessage(
          'Se actualizó correctamente el socio',
          'success',
        );
      })
      .catch((error) => {
        this.props.spawnMessage(
          'No se puede actualizar el socio',
          'error',
          'ERROR',
        );
      });
  };

  updateItem = (id, name, contractId) => {
    this.services
      .updateItem(id, name, contractId)
      .then((response) => {
        const index = this.state.items.findIndex(
          (item) => item.value === response.data.id,
        );
        const temporal = this.state.items;
        const currentItem = {
          value: response.data.id,
          label: response.data.name,
        };
        temporal[index] = currentItem;
        this.setState({
          items: temporal,
          itemModal: { ...this.state.itemModal, currentItem },
        });
      })
      .catch((error) => {
        this.props.spawnMessage(
          'No se puede actualizar el item',
          'error',
          'ERROR',
        );
      });
  };

  searchCategory = (categoryToSearch) => {
    this.services
      .getCategoryById(categoryToSearch)
      .then((response) => {
        this.setState({
          categoryModal: {
            ...this.state.categoryModal,
            editableInfo: response.data,
            isOpen: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchBusinessPartner = (partnerToSearch) => {
    this.services
      .getPartnerById(partnerToSearch)
      .then((response) => {
        this.setState({
          businessPatnerModal: {
            ...this.state.businessPatnerModal,
            editableInfo: response.data,
            isOpen: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchItem = (itemToSearch) => {
    this.services
      .getItemById(itemToSearch)
      .then((response) => {
        this.setState({
          itemModal: {
            ...this.state.itemModal,
            editableInfo: response.data,
            isOpen: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeForSearchCategory = (currentCategory) => {
    this.setState({
      contractModal: {
        ...this.state.contractModal,
        data: { group: currentCategory },
      },
      categoryModal: { ...this.state.categoryModal, currentCategory },
      itemModal: {
        ...this.state.itemModal,
        currentItem: {
          value: 0,
          label: 'Seleccione un item',
        },
      },
    });
  };

  changeForSearchPartner = (currentPatner) => {
    this.setState({
      contractModal: {
        ...this.state.contractModal,
        data: { patner: currentPatner },
      },
      businessPatnerModal: { ...this.state.businessPatnerModal, currentPatner },
    });
  };

  changeForSearchItem = (currentItem) => {
    this.setState({
      contractModal: {
        ...this.state.contractModal,
        data: { item: currentItem },
      },
      itemModal: {
        ...this.state.itemModal,
        currentItem: { label: 'Seleccione un item', value: 0 },
      },
    });
  };

  changeItemIsLocked = (groupId) => {
    this.services
      .findByForeignId(this.props.match.params.towerId, groupId)
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        this.setState({
          items,
          itemModal: {
            ...this.state.itemModal,
            currentItem: {
              label: 'Seleccione un item',
              value: 0,
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAllPatners = () => {
    this.services.getAllPatners(this.props.match.params.towerId);
  };

  sendBillings = (billings) => {
    this.setState({ billings });
  };

  sendGeneralInfo = (generalInformation) => {
    this.setState({ generalInformation });
  };

  sendAttachments = (attachment) => {
    this.setState({
      attachmentData: attachment,
    });
  };

  currentEvent = (currentEvent) => {
    this.setState((prevState) => {
      const events = [...prevState.events];
      events.splice(1, 0, currentEvent);
      events.join();
      return {
        events,
      };
    });
  };

  sendContractNumber = (contractNumber) => {
    this.setState({ contractNumber, alreadyCreated: false });
  };

  currentPut = (event) => {
    this.setState({ currentContract: event });
  };

  sendErrorInProp = (name, errorMessage) => {
    this.setState((prevState) => ({
      errors: { ...prevState.errors, [name]: errorMessage },
    }));
  };

  setDefaultContract = (defaultContract) => {
    if (defaultContract) {
      this.setState({
        contractModal: { isOpen: false },
        alreadyCreated: false,
        contract: null,
        businessPatnerModal: {
          ...this.state.businessPatnerModal,
          currentPatner: {
            value: 0,
            label: 'Seleccione un socio',
          },
        },
        itemModal: {
          ...this.state.itemModal,
          currentItem: { value: 0, label: 'Seleccione un item' },
        },
        categoryModal: {
          ...this.state.categoryModal,
          currentCategory: {
            value: 0,
            label: 'Seleccione un grupo',
          },
        },
        errors: {
          title: false,
          description: false,
          contractNumber: false,
          partner: '',
          group: '',
          state: '',
          item: '',
        },
        currentContract: false,
      });
    }
  };

  addContract = () => {
    let readyToSend = false;
    const billingsLocked = this.state.billings.some(
      (bill) => bill.isLocked === false,
    );
    const emptyBill = this.state.billings.some((bill) => !bill.amount);
    const requiredInformation = this.state.generalInformation;
    if (requiredInformation.title === '') {
      this.props.spawnMessage(
        'Debe llenar el campo titulo',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('title', true);
    } else if (this.state.billings.length > 0 && emptyBill) {
      this.props.spawnMessage('No se pueden crear cuentas vacías', 'error');
    } else if (requiredInformation.businessPartnerId === 0) {
      this.props.spawnMessage(
        'Debe seleccionar un socio',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('partner', 'Seleccionar un socio');
    } else if (requiredInformation.groupId === '') {
      this.props.spawnMessage(
        'Debe seleccionar un grupo',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('group', 'Seleccionar un grupo');
    } else if (requiredInformation.state === '') {
      this.props.spawnMessage(
        'Debe seleccionar un estado de contrato',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('state', 'Seleccionar un estado');
    } else if (requiredInformation.itemId === '') {
      this.props.spawnMessage(
        'Debe seleccionar un item',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('item', 'Seleccionar un item');
    } else if (requiredInformation.contractNumber === '') {
      this.props.spawnMessage(
        'Debe llenar el campo numero de contrato',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('contractNumber', true);
    } else if (requiredInformation.description === '') {
      this.props.spawnMessage(
        'Debe llenar el campo descripción',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('description', true);
    } else if (requiredInformation.description.length > 250) {
      this.props.spawnMessage(
        'La descripción solo puede tener 250 caracteres',
        'error',
        'ERROR',
        10000,
      );
      this.sendErrorInProp('description', true);
    } else if (billingsLocked) {
      this.props.spawnMessage(
        'Debe guardar todas las cuentas para continuar',
        'error',
      );
    } else {
      readyToSend = true;
      if (readyToSend) {
        let data = this.state.attachmentData || new FormData();
        if (this.state.contract) {
          data = this.state.contract;
        } else {
          data.append(
            'generalInformation',
            JSON.stringify(this.state.generalInformation),
          );
          data.append('billing', JSON.stringify(this.state.billings));
          data.append('urlAttach', JSON.stringify(this.state.urlToSend));
        }

        this.services
          .getAllContracts(this.props.match.params.towerId)
          .then((contracts) => {
            if (
              contracts.data.find(
                (contract) =>
                  contract.contractNumber === this.state.contractNumber,
              ) ||
              this.state.contractNumber === ''
            ) {
              this.props.spawnMessage(
                'Ya existe ese numero de contrato',
                'error',
                'ERROR',
              );
              this.setState({ alreadyCreated: true });
            } else {
              this.services
                .postContract(data, this.props.match.params.towerId)
                .then((response) => {
                  this.setState({ currentContract: true });
                  this.setDefaultContract(this.state.currentContract);
                })
                .catch((error) => {
                  this.props.spawnMessage('Error al crear', 'error', 'ERROR');
                });
            }
          })
          .catch((error) => {
            this.props.spawnMessage(
              'No se puede crear el contrato',
              'error',
              'ERROR',
            );
          });
      }
    }
  };

  sendId = (id) => {
    this.setState({
      contractModal: {
        ...this.state.contractModal,
        contractId: id,
      },
      contractId: id,
    });
  };

  editContractOpen = (editable, id) => {
    if (editable) {
      this.setState({ contractModal: { isLoading: true } });
      this.services
        .getContractById(this.props.match.params.towerId, id)
        .then((response) => {
          const metaData = response.data;
          const stateOfContract = statusOfContractEnum.find((option) => {
            return (
              option.id === metaData.generalInformation.state && {
                id: option.id,
                value: option.value,
              }
            );
          });
          this.setState({
            contractModal: {
              isOpen: true,
              isLoading: false,
              contractId: metaData.generalInformation.id,
              generalInformationData: {
                title: metaData.generalInformation.title,
                businessPartnerId: metaData.partner.id,
                businessPartner: metaData.partner.patnerName,
                groupId: metaData.groupId.id,
                group: metaData.groupId.name,
                state: stateOfContract,
                contractNumber: metaData.generalInformation.contractNumber,
                itemId: metaData.item.id,
                item: metaData.item.name,
                description: metaData.generalInformation.description,
                billings: metaData.billings,
                attachments: metaData.attachments,
              },
            },
            isEditable: true,
          });
        })
        .catch((error) => {
          this.props.spawnMessage(
            'No se puede editar el contrato',
            'error',
            'ERROR',
          );
        });
    }
  };

  sendToDelete = (id) => {
    this.setState({
      billsToDelete: [...this.state.billsToDelete, id],
    });
  };

  sendToDeleteSpecificBill = (id) => {
    this.services
      .deleteSpecificBill(id, this.props.match.params.towerId)
      .then((response) => {
        this.props.spawnMessage('¡Proceso realizado!', 'success', '¡CORRECTO!');
      })
      .catch((error) => {
        this.props.spawnMessage('Algo salió mal...', 'error');
      });
  };

  editContract = () => {
    const dataEditated = new FormData();
    dataEditated.append(
      'generalInformation',
      JSON.stringify(this.state.generalInformation),
    );
    dataEditated.append('billing', JSON.stringify(this.state.billings));
    dataEditated.append('urlAttach', JSON.stringify(this.state.urlToSend));
    const attach = [...this.state.attachments, dataEditated];

    this.services
      .putContract(
        dataEditated,
        this.props.match.params.towerId,
        this.state.contractId,
      )
      .then((response) => {
        this.setState({ currentContract: true });
        if (this.state.billsToDelete && this.state.billsToDelete.length > 0) {
          this.sendToDeleteSpecificBill(this.state.billsToDelete);
        }
        if (this.state.currentContract) {
          this.setState({
            contractModal: {
              isOpen: false,
              generalInformationData: null,
              data: {},
            },
            isEditable: false,
            contract: null,
            attachmentData: undefined,
            urlsLoaded: [],
            urlToSend: undefined,
          });
        }
      })
      .catch((error) => {
        this.props.spawnMessage(
          'No se puede editar el contrato',
          'error',
          'ERROR',
        );
      });
  };

  deleteContract = (id) => {
    this.services
      .deleteContract(id, this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          currentContract: true,
          contractModal: { isOpen: false, generalInformationData: false },
          isEditable: false,
        });
      })
      .catch((error) => {
        this.props.spawnMessage(
          'No se puede eliminar el contrato',
          'error',
          'ERROR',
        );
      });
  };

  watchingContract = () => {
    this.setState({
      contractModal: {
        isOpen: true,
        generalInformationData: false,
      },
    });
  };

  setEditable = (param) => {
    this.setState({ isEditable: param });
  };

  noError = (name) => {
    if (
      name !== 'title' ||
      name !== 'description' ||
      name !== 'contractNumber'
    ) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, [name]: '' },
      }));
    }
    this.setState((prevState) => ({
      errors: { ...prevState.errors, [name]: false },
    }));
  };

  eraseImg = (path) => {
    this.services
      .eraseImage(path)
      .then(() => {
        this.props.spawnMessage('Imagen borrada', 'success');
      })
      .catch((error) => {
        this.props.spawnMessage('No se pudo borrar la imagen', 'error');
      });
  };

  sendUrl = (url) => {
    const urls = [...this.state.urlsLoaded, url];
    this.setState({
      urlsLoaded: urls,
      urlToSend: urls,
    });
  };

  render() {
    return (
      <div className={styles.Contracts}>
        <Navbar
          handleOpenContract={this.handleOpenContract}
          towerId={this.props.match.params.towerId}
          editContractOpen={this.editContractOpen}
          sendId={this.sendId}
          currentContract={this.state.currentContract}
          currentPut={this.currentPut}
          events={this.state.events}
          listInformationPartner={this.state.partners}
          listInformationGroup={this.state.categories}
          deleteContract={this.deleteContract}
        />
        <LoadingContract isLoading={this.state.contractModal.isLoading} />
        <NewContract
          towerId={this.props.match.params.towerId}
          noError={this.noError}
          errors={this.state.errors}
          alreadyCreated={this.state.alreadyCreated}
          expanded={this.state.expanded}
          setEditable={this.setEditable}
          isEditable={this.state.isEditable}
          sendId={this.sendId}
          isOpen={this.state.contractModal.isOpen}
          handleCloseContract={this.handleCloseContract}
          handleCloseItem={this.handleCloseItem}
          handleOpenCategory={this.handleOpenCategory}
          handleOpenBusinessPatner={this.handleOpenBusinessPatner}
          handleOpenItem={this.handleOpenItem}
          searchCategory={this.searchCategory}
          searchBusinessPartner={this.searchBusinessPartner}
          searchItem={this.searchItem}
          categories={this.state.categories}
          items={this.state.items}
          editable={this.enableEditable}
          disableEditable={this.disableEditable}
          partners={this.state.partners}
          categoryProp={this.state.categoryModal.currentCategory}
          itemProp={this.state.itemModal.currentItem}
          changeForSearchCategory={this.changeForSearchCategory}
          changeForSearchPartner={this.changeForSearchPartner}
          changeForSearchItem={this.changeForSearchItem}
          partnerProp={this.state.businessPatnerModal.currentPatner}
          services={this.services}
          itemIsLocked={this.state.itemModal.isLocked}
          sendBillings={this.sendBillings}
          changeItemIsLocked={this.changeItemIsLocked}
          currentGroupId={this.currentGroupId}
          sendGeneralInfo={this.sendGeneralInfo}
          sendAttachments={this.sendAttachments}
          events={this.state.events}
          currentEvent={this.currentEvent}
          addContract={this.addContract}
          dataIfEdit={this.state.contractModal.generalInformationData}
          editContract={this.editContract}
          watchingContract={this.watchingContract}
          sendContractNumber={this.sendContractNumber}
          sendToDelete={this.sendToDelete}
          businessPartnerOpen={this.state.businessPatnerModal.isOpen}
          categoryopen={this.state.categoryModal.isOpen}
          itemOpen={this.state.itemModal.isOpen}
          eraseImg={this.eraseImg}
          sendUrl={this.sendUrl}
        />
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.categoryModal.isOpen}
          handleCloseCategory={this.handleCloseCategory}
          fullWidth={true}
          maxWidth="lg"
        >
          <ClickAwayListener onClickAway={this.handleCloseCategory}>
            <DialogContent>
              <Category
                handleCloseCategory={this.handleCloseCategory}
                newCategory={this.newCategory}
                updateCategory={this.updateCategory}
                editable={this.state.categoryModal.isEditable}
                informationToEdit={this.state.categoryModal.editableInfo}
              />
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.businessPatnerModal.isOpen}
          handleCloseBusinessPatner={this.handleCloseBusinessPatner}
          fullWidth={true}
          maxWidth="lg"
        >
          <ClickAwayListener onClickAway={this.handleCloseBusinessPatner}>
            <DialogContent>
              <BusinessPatner
                handleCloseBusinessPatner={this.handleCloseBusinessPatner}
                newBusinessPartner={this.newBusinessPartner}
                updatePartner={this.updatePartner}
                editable={this.state.businessPatnerModal.isEditable}
                informationToEdit={this.state.businessPatnerModal.editableInfo}
              />
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.itemModal.isOpen}
          handleCloseItem={this.handleCloseItem}
          fullWidth={true}
          maxWidth="lg"
        >
          <ClickAwayListener onClickAway={this.handleCloseItem}>
            <DialogContent>
              <Item
                handleCloseItem={this.handleCloseItem}
                newItem={this.newItem}
                updateItem={this.updateItem}
                editable={this.state.itemModal.isEditable}
                informationToEdit={this.state.itemModal.editableInfo}
              />
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
      </div>
    );
  }
}
export default withDefaultLayout(Contracts);
