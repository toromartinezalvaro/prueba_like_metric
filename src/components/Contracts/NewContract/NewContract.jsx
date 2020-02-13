/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ExpandBillingFinancials from './Expand/BillingFinancials/BillingFinancials';
import ExpandGeneralInfo from './Expand/GeneralInfo/GeneralInfo';
import ExpandLifeCycle from './Expand/LifeCycle/LifeCycle';
import ExpandOrganizationContact from './Expand/OrganizationContact/OrganizationContact';
import ExpandCustom from './Expand/Custom/Custom';
import ExpandAttachment from './Expand/Attachment/Attachment';
import DeleteAction from './CloseModal/index';
import styles from './NewContract.module.scss';

const NewContract = ({
  isOpen,
  handleCloseCategory,
  handleCloseContract,
  handleCloseItem,
  handleOpenCategory,
  handleOpenBusinessPatner,
  handleOpenItem,
  categories,
  items,
  partners,
  editable,
  searchBusinessPartner,
  disableEditable,
  searchCategory,
  categoryProp,
  partnerProp,
  itemProp,
  changeForSearchCategory,
  changeForSearchPartner,
  changeForSearchItem,
  searchItem,
  sendBillings,
  services,
  itemIsLocked,
  sendGeneralInfo,
  changeItemIsLocked,
  currentGroupId,
  towerId,
  events,
  currentEvent,
  addContract,
  sendAttachments,
  dataIfEdit,
  editContract,
  sendContractNumber,
  watchingContract,
  sendId,
  isEditable,
  setEditable,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dataIfEdit && isEditable) {
      sendId(dataIfEdit.id);
      setEditable(true);
    }
  }, []);

  const confirmClose = () => {
    setOpen(false);
    handleCloseContract();
  };

  const setClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className={styles.dialogExpand}
      open={isOpen}
      scroll="body"
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogContentText>
        <div className={styles.title}>
          <div className={`${styles.circleIcon}  ${styles.circleColorTitle}`}>
            <Icon className={`${styles.icon} fas fa-plus`} />
          </div>
          <h2 className={styles.title}>Agregar Contrato</h2>
        </div>

        <ExpandGeneralInfo
          handleOpenCategory={handleOpenCategory}
          handleCloseCategory={handleCloseCategory}
          handleOpenBusinessPatner={handleOpenBusinessPatner}
          handleCloseItem={handleCloseItem}
          itemProp={itemProp}
          currentGroupId={currentGroupId}
          changeForSearchItem={changeForSearchItem}
          handleOpenItem={handleOpenItem}
          searchCategory={searchCategory}
          searchItem={searchItem}
          searchBusinessPartner={searchBusinessPartner}
          categories={categories}
          items={items}
          changeItemIsLocked={changeItemIsLocked}
          partners={partners}
          itemIsLocked={itemIsLocked}
          editable={editable}
          disableEditable={disableEditable}
          categoryProp={categoryProp}
          changeForSearchCategory={changeForSearchCategory}
          changeForSearchPartner={changeForSearchPartner}
          partnerProp={partnerProp}
          sendGeneralInfo={sendGeneralInfo}
          dataIfEdit={dataIfEdit}
          sendContractNumber={sendContractNumber}
        />
        <br />
        <ExpandBillingFinancials
          towerId={towerId}
          sendBillings={sendBillings}
          events={events}
          currentEvent={currentEvent}
          watchingContract={watchingContract}
          dataIfEdit={dataIfEdit}
        />
        <br />
        <ExpandAttachment
          sendAttachments={sendAttachments}
          dataIfEdit={dataIfEdit}
        />
        <br />
        {
          <DeleteAction
            confirmClose={confirmClose}
            setClose={setClose}
            open={open}
          />
        }
        <div className={styles.actionContainer}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<Icon className="fas fa-file-signature" />}
            onClick={isEditable ? editContract : addContract}
          >
            {isEditable ? 'Editar Contrato' : 'Crear Contrato'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={`${styles.button} ${styles.buttonMargin}`}
            startIcon={<Icon className="fas fa-ban" />}
            onClick={() => setOpen(true)}
          >
            Cerrar
          </Button>
        </div>
      </DialogContentText>
    </Dialog>
  );
};

export default NewContract;
