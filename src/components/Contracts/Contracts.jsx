/*
 * Created by Jcatman on Wed Oct 16 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import React, { useState } from 'react';
import styles from './Contracts.module.scss';
import Navbar from './Navbar/Navbar';
import NewContract from './NewContract/NewContract';

const Contracts = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const [expanded, setExpanded] = useState('GeneralInfo');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.Contracts}>
      <Navbar
        handleOpen={handleOpen}
        handleClose={handleClose}
        scroll={scroll}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        expanded={expanded}
      />
      <NewContract
        handleOpen={handleOpen}
        handleClose={handleClose}
        scroll={scroll}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        expanded={expanded}
        open={open}
      />
    </div>
  );
};

export default Contracts;
