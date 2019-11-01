/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Custom from '../../Content/Custom/Custom';
import styles from './Custom.module.scss';

const ExpandCustom = () => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mt={4}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div
            className={`${styles.circleIcon}  ${styles.circleColorPersonalized}`}
          >
            <Icon className={`${styles.icon} fas fa-paperclip`} />
          </div>
          <div className={styles.titleExpand}>Propiedades Personalizadas</div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <Custom />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandCustom;
