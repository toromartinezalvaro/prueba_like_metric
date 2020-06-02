/*
 * Created by Jcatman on Wed Dec 11 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import ContractService from '../../../services/contract/contractService';
import {
  Button,
  Card,
  TextField,
  CardContent,
  Dialog,
  DialogContentText,
  ClickAwayListener,
} from '@material-ui/core';
import DeleteAction from './DeleteAction';
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
      deleteAction: false,
    };
  }

  componentDidMount() {
    this.setState({ viewerModal: { isOpen: this.props.openView } });
  }

  openEditable = () => {
    this.props.editContractOpen(true, this.props.contractId);
    this.props.closeInformationView(true);
  };

  setOpenDeleteAction = () => {
    this.setState({ deleteAction: true });
  };

  setCloseDeleteAction = () => {
    this.setState({ deleteAction: false });
  };

  deletedContract = () => {
    this.setState({ deleteAction: false, viewerModal: { isOpen: false } });
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
        <ClickAwayListener onClickAway={this.props.closeViewModal}>
          <DialogContentText>
            <div className={style.title}>
              <ViewGeneralInfo contractDataView={this.props.contractDataView} />
              <ViewBillingAndFinancials
                contractDataView={this.props.contractDataView}
                events={this.props.events}
              />
              {this.state.deleteAction && (
                <DeleteAction
                  title={this.props.contractDataView.title}
                  contractNumber={this.props.contractDataView.contractNumber}
                  id={this.props.id}
                  isOpen={this.state.deleteAction}
                  setClose={this.setCloseDeleteAction}
                  deleteContract={this.props.deleteContract}
                  deletedContract={this.deletedContract}
                />
              )}
              <div className={style.actionContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={style.button}
                  startIcon={<Icon className="fa fa-edit" />}
                  onClick={this.openEditable}
                >
                  Editar Contrato
                </Button>
                <Button
                  variant="contained"
                  className={style.deleteButton}
                  color="secondary"
                  startIcon={<Icon className="fas fa-trash-alt" />}
                  onClick={this.setOpenDeleteAction}
                >
                  Eliminar contrato
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  className={`${style.button} ${style.buttonMargin}`}
                  startIcon={<Icon className="fas fa-ban" />}
                  onClick={this.props.closeViewModal}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </DialogContentText>
        </ClickAwayListener>
      </Dialog>
    );
  }
}

export default ViewContractInformation;
