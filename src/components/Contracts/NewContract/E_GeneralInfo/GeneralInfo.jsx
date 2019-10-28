import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import GeneralInfo from '../../C_GeneralInfo/GeneralInfo';
import styles from './GeneralInfo.module.scss';

const ExpandGeneralInfo = ({
  handleOpenCategory,
  handleCloseCategory,
  handleOpenBusinessPatner,
  categories,
  partners,
  searchCategory,
}) => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mb={4}>
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
            searchCategory={searchCategory}
            partners={partners}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandGeneralInfo;
