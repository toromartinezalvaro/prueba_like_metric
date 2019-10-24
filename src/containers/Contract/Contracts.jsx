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
      },
      contractModal: {
        isOpen: false,
      },
      BusinessPatnerModal: {
        isOpen: false,
      },
      expanded: 'GeneralInfo',
    };
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

  newCategory = (categoryName) => {
    this.services
      .postCategoryContracts('contractcategory', { categoryName })
      .then(console.log('clean'))
      .catch((error) => {
        console.log(error);
      });
  };

  searchCategory = (textToSearch) => {
    JSON.stringify(this.services
      .getCategoryToSearch(textToSearch));
  };

  componentDidMount() {
    console.log(this.searchCategory("Twr"));
  }

  render() {
    return (
      <div className={styles.Contracts}>
        <Navbar handleOpenContract={this.handleOpenContract} />
        <NewContract
          expanded={this.state.expanded}
          isOpen={this.state.contractModal.isOpen}
          onClose={this.handleCloseContract}
          handleOpenCategory={this.handleOpenCategory}
          handleOpenBusinessPatner={this.handleOpenBusinessPatner}
          searchCategory={this.searchCategory}
          categories={[{ name: 'prros' }, { name: 'camilos' }, { name: 'Josese' }, ]}
        />
        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.categoryModal.isOpen}
          handleOpen={this.state.handleOpen}
          handleCloseCategory={this.state.handleCloseCategory}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogContent>
            <Category
              handleCloseCategory={this.state.handleCloseCategory}
              newCategory={this.newCategory}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          className={styles.dialogExpand}
          scroll="body"
          open={this.state.BusinessPatnerModal.isOpen}
          handleOpenBusinessPatner={this.handleOpenBusinessPatner}
          handleCloseBusinessPatner={this.handleCloseBusinessPatner}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogContent>
            <BusinessPatner />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Contracts;
