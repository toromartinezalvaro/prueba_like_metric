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
import ExpandBillingFinancials from './Expand/E_BillingFinancials/BillingFinancials';
import ExpandGeneralInfo from './Expand/E_GeneralInfo/GeneralInfo';
import ExpandLifeCycle from './Expand/E_LifeCycle/LifeCycle';
import ExpandOrganizationContact from './Expand/E_OrganizationContact/OrganizationContact';
import ExpandCustom from './Expand/E_Custom/Custom';
import ExpandAttachment from './Expand/E_Attachment/Attachment';
import styles from './NewContract.module.scss';

const NewContract = ({
  isOpen,
  handleCloseCategory,
  handleCloseContract,
  handleOpenCategory,
  handleOpenBusinessPatner,
  categories,
  partners,
  editable,
  searchBusinessPartner,
  disableEditable,
  searchCategory,
  categoryProp,
  partnerProp,
  changeForSearchCategory,
  changeForSearchPartner,
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
          searchCategory={searchCategory}
          searchBusinessPartner={searchBusinessPartner}
          categories={categories}
          partners={partners}
          editable={editable}
          disableEditable={disableEditable}
          categoryProp={categoryProp}
          changeForSearchCategory={changeForSearchCategory}
          changeForSearchPartner={changeForSearchPartner}
          partnerProp={partnerProp}
        />
        <br />
        <ExpandLifeCycle />
        <br />
        <ExpandBillingFinancials />
        <br />
        <ExpandOrganizationContact />
        <br />
        <ExpandCustom />
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
