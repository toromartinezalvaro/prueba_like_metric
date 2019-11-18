/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
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
}) => {
  return (
    <Dialog
      className={styles.dialogExpand}
      open={isOpen}
      scroll="body"
      fullWidth={true}
      maxWidth="md"
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
        />
        <br />
        <ExpandBillingFinancials sendBillings={sendBillings} />
        <br />
        <ExpandAttachment />
        <br />
        <div className={styles.actionContainer}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<Icon className="fas fa-file-signature" />}
          >
            Agregar Contrato
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={`${styles.button} ${styles.buttonMargin}`}
            startIcon={<Icon className="fas fa-ban" />}
            onClick={handleCloseContract}
          >
            Cancelar
          </Button>
        </div>
      </DialogContentText>
    </Dialog>
  );
};

export default NewContract;
