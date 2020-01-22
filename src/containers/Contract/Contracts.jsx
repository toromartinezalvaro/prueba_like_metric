/*
 * Created on Tue Oct 22 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import React, { Component } from 'react';
import styles from './Contracts.module.scss';
import Navbar from '../../components/Contracts/Navbar/Navbar';
import NewContract from '../../components/Contracts/NewContract/NewContract';
import Category from '../../components/Contracts/NewContract/Content/Category/Category';
import statusOfContractEnum from '../../components/Contracts/NewContract/Content/GeneralInfo/statusOfContract.enum';
import BusinessPatner from '../../components/Contracts/NewContract/BusinessPatner/BusinessPatner';
import ContractService from '../../services/contract/contractService';
import Item from '../../components/Contracts/NewContract/Content/Item/Item';
import SimpleSnackbar from '../../components/UI2/ToastAlert/ToastAlert';
import EventService from '../../services/event/EventServices';

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
      contractNumber: null,
      currentContract: null,
      alert: {
        opened: false,
        message: '',
      },
    };
  }

  toastAlert = (message) => {
    this.setState({ alert: { opened: true, message } });
    setTimeout(() => {
      this.setState({ alert: { opened: false, message } });
    }, 500);
  };

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
      contractModal: { ...this.state.categoryModal, isOpen: false },
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
        currentItem: 'Selecciona un Item',
      },
    });
  };

  handleOpenContract = () => {
    this.setState({ contractModal: { isOpen: true } });
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
          console.log(error);
          this.toastAlert('Error al crear un grupo');
        });
    }
    this.toastAlert('ERROR: Debes agregar un nombre para crear un grupo');
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
          this.toastAlert('Error al crear un socio');
          console.log(error);
        });
    }
    this.toastAlert('ERROR: Debes agregar un nombre para crear un socio');
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
          this.toastAlert('Error al crear un item');
          console.log(error);
        });
    }
    this.toastAlert('ERROR: Debes agregar un nombre para crear un item');
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
        this.toastAlert('ERROR: No se puede actualizar el grupo');
        console.log(error);
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
      })
      .catch((error) => {
        this.toastAlert('ERROR: No se puede actualizar el socio');
        console.log(error);
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
        this.toastAlert('ERROR: No se puede actualizar el item');
        console.log(error);
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
      itemModal: { ...this.state.itemModal, currentItem },
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
            currentItem: undefined,
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
    attachment.append(
      'generalInformation',
      JSON.stringify(this.state.generalInformation),
    );
    attachment.append('billing', JSON.stringify(this.state.billings));
    const attach = [...this.state.attachments, attachment];
    this.setState({
      contract: attachment,
    });
  };

  currentEvent = (currentEvent) => {
    this.setState({ events: [...this.state.events, currentEvent] });
  };

  sendContractNumber = (contractNumber) => {
    this.setState({ contractNumber });
  };

  addContract = () => {
    this.services
      .getAllContracts(this.props.match.params.towerId)
      .then((contracts) => {
        if (
          contracts.data.find(
            (contract) => contract.contractNumber === this.state.contractNumber,
          )
        ) {
          this.toastAlert('ERROR: Ya existe un contrato con ese nombre');
        } else {
          this.services
            .postContract(this.state.contract, this.props.match.params.towerId)
            .then((response) => {
              console.log(response);
              this.setState({ currentContract: response });
            })
            .catch((error) => {
              this.toastAlert('Error al crear');
              console.log(error);
            });
            if(this.state.currentContract){
              this.setState({ contractModal: { isOpen: false } });
            }
        }
      })
      .catch((error) => {
        this.toastAlert('ERROR: No se puede crear el contrato');
        console.log(error);
      });
  };

  sendId = (id) => {
    this.setState({
      contractModal: {
        ...this.state.contractModal,
        contractId: id,
      },
    });
  };

  editContractOpen = (editable, id) => {
    if (editable) {
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
          });
        })
        .catch((error) => {
          this.toastAlert('ERROR: No se puede editar el contrato');
          console.log(error);
        });
    }
  };

  editContract = () => {
    const dataEditated = new FormData();
    dataEditated.append(
      'generalInformation',
      JSON.stringify(this.state.generalInformation),
    );
    dataEditated.append('billing', JSON.stringify(this.state.billings));
    const attach = [...this.state.attachments, dataEditated];
    this.setState({
      contract: dataEditated,
    });

    this.services
      .putContract(
        dataEditated,
        this.props.match.params.towerId,
        this.state.contractModal.contractId,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.toastAlert('ERROR: No se puede editar el contrato');
        console.log(error);
      });
    this.setState({
      contractModal: { ...this.state.contractModal, isOpen: false },
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
        />
        <NewContract
          towerId={this.props.match.params.towerId}
          expanded={this.state.expanded}
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
          sendContractNumber={this.sendContractNumber}
        />
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.categoryModal.isOpen}
          handleCloseCategory={this.handleCloseCategory}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogContent>
            <Category
              handleCloseCategory={this.handleCloseCategory}
              newCategory={this.newCategory}
              updateCategory={this.updateCategory}
              editable={this.state.categoryModal.isEditable}
              informationToEdit={this.state.categoryModal.editableInfo}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.businessPatnerModal.isOpen}
          handleCloseBusinessPatner={this.handleCloseBusinessPatner}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogContent>
            <BusinessPatner
              handleCloseBusinessPatner={this.handleCloseBusinessPatner}
              newBusinessPartner={this.newBusinessPartner}
              updatePartner={this.updatePartner}
              editable={this.state.businessPatnerModal.isEditable}
              informationToEdit={this.state.businessPatnerModal.editableInfo}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.itemModal.isOpen}
          handleCloseItem={this.handleCloseItem}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogContent>
            <Item
              handleCloseItem={this.handleCloseItem}
              newItem={this.newItem}
              updateItem={this.updateItem}
              editable={this.state.itemModal.isEditable}
              informationToEdit={this.state.itemModal.editableInfo}
            />
          </DialogContent>
        </Dialog>
        <SimpleSnackbar
          message={this.state.alert.message}
          opened={this.state.alert.opened}
        />
      </div>
    );
  }
}
export default Contracts;
