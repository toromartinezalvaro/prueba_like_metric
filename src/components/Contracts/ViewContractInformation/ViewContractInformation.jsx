/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import ContractService from '../../../services/contract/contractService';
import {
  Button,
  Card,
  TextField,
  CardContent,
  Dialog,
  DialogContentText,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ViewGeneralInfo from './viewGeneralInfo/ViewGeneralInfo';
import ViewBillingAndFinancials from './viewBillingAndFinancials/ViewBillingAndFInancials';
import style from './ViewContractInformation.module.scss';

class ViewContractInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerModal: {
        isOpen: false,
      },
    };
  }

  componentDidMount() {
    this.setState({ viewerModal: { isOpen: this.props.openView } });
  }

  openEditable = () => {
    this.props.editContractOpen(true, this.props.contractId);
  };

  render() {
    return (
      <Dialog
        className={style.dialogExpand}
        open={this.state.viewerModal.isOpen}
        scroll="body"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContentText>
          <div className={style.title}>
            <ViewGeneralInfo contractDataView={this.props.contractDataView} />
            <ViewBillingAndFinancials
              contractDataView={this.props.contractDataView}
            />
            <div className={style.actionContainer}>
              <Button
                variant="contained"
                color="primary"
                className={style.button}
                startIcon={<Icon className="fas fa-file-signature" />}
                onClick={this.openEditable}
              >
                Editar Contrato
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={`${style.button} ${style.buttonMargin}`}
                startIcon={<Icon className="fas fa-ban" />}
                onClick={this.props.closeViewModal}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContentText>
      </Dialog>
    );
  }
}

export default ViewContractInformation;
