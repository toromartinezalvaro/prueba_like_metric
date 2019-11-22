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
import BillingFinancials from '../../Content/BillingFinancials/BillingFinancials';
import styles from './BillingFinancials.module.scss';

const ExpandBillingFinancials = ({ sendBillings, towerId }) => {
  return (
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
          <BillingFinancials towerId={towerId} sendBillings={sendBillings} />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandBillingFinancials;
