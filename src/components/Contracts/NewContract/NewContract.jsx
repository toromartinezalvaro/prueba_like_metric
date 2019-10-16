import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import BusinessPatner from '../C_BusinessPatner/BusinessPatner';
import BillingFinancials from '../C_BillingFinancials/BillingFinancials';
import Category from '../C_Category/Category';
import GeneralInformation from '../C_GeneralInfo/GeneralInfo';
import OrganizationContact from '../C_OrganizationContact/OrganizationContact';
import Custom from '../C_Custom/Custom';

import styles from './NewContract.module.scss';

const NewContract = ({ open, handleClose, scroll, fullWidth, maxWidth }) => {
  return (
    <Dialog
      className={styles.dialogExpand}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogContentText>
        <div className={styles.title}>
          <div className={`${styles.circleIcon}  ${styles.circleColorTitle}`}>
            <Icon className={`${styles.icon} fas fa-plus`} />
          </div>
          <h2 className={styles.title}>Agregar Contrato</h2>
        </div>

        <ExpansionPanel className={styles.expansionPanel} mb={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}
              >
                <Icon className={`${styles.iconGeneral} fas fa-book-reader`} />
              </div>
              <div className={styles.titleExpand}>Información General</div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <GeneralInformation />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={styles.expansionPanel} mt={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorCicle}`}
              >
                <Icon className={`${styles.icon} fas fa-redo-alt`} />
              </div>
              <div className={styles.titleExpand}>Ciclo De Vida</div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography></Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={styles.expansionPanel} mt={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorFinantials}`}
              >
                <Icon className={`${styles.icon} fas fa-tag`} />
              </div>
              <div className={styles.titleExpand}>Facturación y Finanzas</div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <BillingFinancials />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={styles.expansionPanel} mt={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorPeople}`}
              >
                <Icon className={`${styles.icon} fas fa-user-friends`} />
              </div>
              <div className={styles.titleExpand}>
                Organización y personas de contacto
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <OrganizationContact />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={styles.expansionPanel} mt={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorPersonalized}`}
              >
                <Icon className={`${styles.icon} fas fa-paperclip`} />
              </div>
              <div className={styles.titleExpand}>
                Propiedades Personalizadas
              </div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Custom />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <ExpansionPanel className={styles.expansionPanel} mt={4}>
          <ExpansionPanelSummary aria-controls="generalInformationContent">
            <Typography className={styles.heading}>
              <div
                className={`${styles.circleIcon}  ${styles.circleColorAtachment}`}
              >
                <Icon className={`${styles.icon} fas fa-paperclip`} />
              </div>
              <div className={styles.titleExpand}>Archivos Adjuntos</div>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography></Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

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
          >
            Cancelar
          </Button>
        </div>
      </DialogContentText>
    </Dialog>
  );
};

export default NewContract;
