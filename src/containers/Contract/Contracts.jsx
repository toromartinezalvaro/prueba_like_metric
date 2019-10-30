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
import Category from '../../components/Contracts/NewContract/C_Category/Category';
import BusinessPatner from '../../components/Contracts/NewContract/C_BusinessPatner/BusinessPatner';
import ContractService from '../../services/contract/contractService';

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.services = new ContractService();
    this.state = {
      categoryModal: {
        isOpen: false,
        isEditable: false,
        editableInfo: {},
      },
      contractModal: {
        isOpen: false,
      },
      BusinessPatnerModal: {
        isOpen: false,
        isEditable: false,
        editableInfo: {}
      },
      expanded: 'GeneralInfo',
      categories: [],
      partners: [],
    };
  }

  componentDidMount() {
    this.services
      .getAllCategories()
      .then((response) => {
        const categories = response.data.map((category) => {
          return {
            value: category.id,
            label: category.categoryName,
          };
        });
        categories.unshift({
          value: '',
          label: 'Selecciona una categoría',
        });
        this.setState({
          categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.services
      .getAllPatners()
      .then((response) => {
        const partners = response.data.map((partner) => {
          return {
            value: partner.id,
            label: partner.patnerName,
          };
        });
        partners.unshift({
          value: '',
          label: 'Selecciona un socio',
        });
        this.setState({
          partners,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }



  handleOpenContract = () => {
    this.setState({ contractModal: { isOpen: true } });
  };

  handleCloseContract = () => {
    this.setState({ contractModal: { isOpen: false } });
  };

  handleOpenCategory = () => {
    this.setState({ categoryModal: { isOpen: true } });
  };

  handleCloseCategory = () => {
    this.setState({ categoryModal: { isOpen: false } });
  };

  handleOpenBusinessPatner = () => {
    this.setState({ BusinessPatnerModal: { isOpen: true } });
  };

  handleCloseBusinessPatner = () => {
    this.setState({ BusinessPatnerModal: { isOpen: false } });
  };

  enableEditable = () => {
    this.setState({ catagoryModal: { isEditable: true } });
  }

  disableEditable = () => {
    this.setState({ categoryModal: { isEditable: false } });
  }

  newCategory = (categoryName) => {
    this.services
      .postCategoryContracts({ categoryName })
      .catch((error) => {
        console.log(error);
      });
  };

  updateCategory = (editable) => {
    this.services
      .putCategoryContracts({ editable })
      .catch((error) => { console.log(error) });
  }

  updatePartner = (editable) => {
    this.services
      .putBusinessPartner({ editable })
      .catch((error) => { console.log(error) });
  }

  newBusinessPartner = (partner) => {
    this.services
      .postBusinessPatnerContract(partner)
      .catch((error) => {
        console.log(error);
      });
  };

  searchCategory = (categoryToSearch) => {
    this.services.getCategoryById(categoryToSearch)
      .then((response) => {
        this.setState({
          categoryModal: {
            editableInfo: response.data
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchBusinessPartner = (partnerToSearch) => {
    this.services.getPartnerById(partnerToSearch)
      .then((response) => {
        console.log("The partner is", response.data)
        this.setState({
          BusinessPatnerModal: {
            editableInfo: response.data
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getAllPatners = () => {
    this.services.getAllPatners();
  };

  render() {
    return (
      <div className={styles.Contracts}>
        <Navbar handleOpenContract={this.handleOpenContract} />
        <NewContract
          expanded={this.state.expanded}
          isOpen={this.state.contractModal.isOpen}
          handleCloseContract={this.handleCloseContract}
          handleOpenCategory={this.handleOpenCategory}
          handleOpenBusinessPatner={this.handleOpenBusinessPatner}
          searchCategory={this.searchCategory}
          searchBusinessPartner={this.searchBusinessPartner}
          categories={this.state.categories}
          editable={this.enableEditable}
          disableEditable={this.disableEditable}
          partners={this.state.partners}
        />
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.categoryModal.isOpen}
          handleCloseCategory={this.handleCloseCategory}
          fullWidth={true}
          maxWidth="md"
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
          open={this.state.BusinessPatnerModal.isOpen}
          handleCloseBusinessPatner={this.handleCloseBusinessPatner}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogContent>
            <BusinessPatner
              handleCloseBusinessPatner={this.handleCloseBusinessPatner}
              newBusinessPartner={this.newBusinessPartner}
              updatePartner = {this.updatePartner}
              editable={this.state.BusinessPatnerModal.isEditable}
              informationToEdit={this.state.BusinessPatnerModal.editableInfo}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Contracts;
