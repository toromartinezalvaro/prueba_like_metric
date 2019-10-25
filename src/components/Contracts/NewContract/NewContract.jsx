import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ExpandBillingFinancials from './E_BillingFinancials/BillingFinancials';
import ExpandGeneralInfo from './E_GeneralInfo/GeneralInfo';
import ExpandLifeCycle from './E_LifeCycle/LifeCycle';
import ExpandOrganizationContact from './E_OrganizationContact/OrganizationContact';
import ExpandCustom from './E_Custom/Custom';
import ExpandAttachment from './E_Attachment/Attachment';
import styles from './NewContract.module.scss';

const NewContract = ({
  isOpen,
  handleCloseCategory,
  handleCloseContract,
  handleOpenCategory,
  handleOpenBusinessPatner,
  categories,
  searchCategory,
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
          categories={categories}
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
