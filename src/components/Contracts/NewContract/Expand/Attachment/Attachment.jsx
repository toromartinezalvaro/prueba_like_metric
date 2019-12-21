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
import Attachment from '../../Content/Attachment/Attachment';
import styles from './Attachment.module.scss';

const ExpandAttachment = ({ sendAttachments, dataIfEdit }) => {
  return (
    <ExpansionPanel className={styles.expansionPanel} mt={4}>
      <ExpansionPanelSummary aria-controls="generalInformationContent">
        <Typography className={styles.heading}>
          <div
            className={`${styles.circleIcon}  ${styles.circleColorAtachment}`}
          >
            <Icon className={`${styles.icon} fas fa-paperclip`} />
          </div>
          <div className={styles.titleExpand}>Archivo Adjunto</div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <Attachment
            sendAttachments={sendAttachments}
            dataIfEdit={dataIfEdit}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpandAttachment;
