import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import styles from './LifeCycle.module.scss';

const ExpandLifeCycle = () => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mt={4}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div className={`${styles.circleIcon}  ${styles.circleColorCicle}`}>
            <Icon className={`${styles.icon} fas fa-redo-alt`} />
          </div>
          <div className={styles.titleExpand}>Ciclo De Vida</div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography></Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandLifeCycle;
