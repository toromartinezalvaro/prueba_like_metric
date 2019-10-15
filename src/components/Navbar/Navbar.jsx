/*
 * Created by Jcatman on Wed Oct 09 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import styles from './Navbar.module.scss';

import BusinessPatner from '../BusinessPatner/BusinessPatner';
import GeneralInformation from '../C_GeneralInfo/GeneralInfo';

import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [expanded, setExpanded] = useState('GeneralInfo');

  const handleCloseExpand = () => {
    setExpanded('');
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>

      <nav className={styles.navigationBar}>
        <ul className={styles.menuContainer}>
          <li className={styles.itemList} onClick={handleOpen}>
            Contracts
          </li>
        </ul>
      </nav>

      <Dialog
        className={styles.dialogExpand}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth={fullWidth}
        maxWidth={maxWidth}>
        <DialogContentText>
          <ExpansionPanel expanded={expanded === 'GeneralInfo'} onClick={handleCloseExpand} className={styles.expansionPanel}>
            <ExpansionPanelSummary
              aria-controls="generalInformationContent">
              <Typography className={styles.heading}>Información General</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <GeneralInformation />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className={styles.expansionPanel}>
            <ExpansionPanelSummary
              aria-controls="generalInformationContent">
              <Typography className={styles.heading}>Información General</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <GeneralInformation />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </DialogContentText>
      </Dialog>

    </div >
  );
};

export default Navbar;
