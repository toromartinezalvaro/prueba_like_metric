/*
 * Created on Thu Oct 31 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import GeneralInfo from '../../Content/GeneralInfo/GeneralInfo';
import styles from './GeneralInfo.module.scss';

const ExpandGeneralInfo = ({
  handleOpenCategory,
  handleCloseCategory,
  handleOpenBusinessPatner,
  categories,
  partners,
  searchCategory,
  searchBusinessPartner,
  editable,
  disableEditable,
  categoryProp,
  partnerProp,
  changeForSearchCategory,
  changeForSearchPartner,
  sendGeneralInfo,
  itemProp,
  changeForSearchItem,
  searchItem,
  handleOpenItem,
  handleCloseItem,
  items,
  itemIsLocked,
  changeItemIsLocked,
  currentGroupId,
  dataIfEdit,
  sendContractNumber,
}) => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mb={4} expanded={true}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div className={`${styles.circleIcon}  ${styles.circleColorGeneral}`}>
            <Icon className={`${styles.iconGeneral} fas fa-book-reader`} />
          </div>
          <div className={styles.titleExpand}>Información General</div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <GeneralInfo
            handleOpenCategory={handleOpenCategory}
            handleCloseCategory={handleCloseCategory}
            handleOpenBusinessPatner={handleOpenBusinessPatner}
            categories={categories}
            items={items}
            searchCategory={searchCategory}
            searchBusinessPartner={searchBusinessPartner}
            partners={partners}
            editable={editable}
            currentGroupId={currentGroupId}
            itemIsLocked={itemIsLocked}
            changeItemIsLocked={changeItemIsLocked}
            disableEditable={disableEditable}
            categoryProp={categoryProp}
            partnerProp={partnerProp}
            itemProp={itemProp}
            searchItem={searchItem}
            changeForSearchItem={changeForSearchItem}
            changeForSearchCategory={changeForSearchCategory}
            changeForSearchPartner={changeForSearchPartner}
            sendGeneralInfo={sendGeneralInfo}
            handleOpenItem={handleOpenItem}
            handleCloseItem={handleCloseItem}
            dataIfEdit={dataIfEdit}
            sendContractNumber={sendContractNumber}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandGeneralInfo;
