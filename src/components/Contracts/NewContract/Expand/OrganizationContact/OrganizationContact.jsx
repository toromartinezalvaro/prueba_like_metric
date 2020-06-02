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
import OrganizationContact from '../../Content/OrganizationContact/OrganizationContact';
import styles from './OrganizationContact.module.scss';

const ExpandOrganizationContact = (services) => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mt={4}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div className={`${styles.circleIcon}  ${styles.circleColorPeople}`}>
            <Icon className={`${styles.icon} fas fa-user-friends`} />
          </div>
          <div className={styles.titleExpand}>
            Organización y personas de contacto
          </div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <OrganizationContact services={services}/>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandOrganizationContact;
