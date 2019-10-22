/*
 * Created on Tue Oct 22 2019
 *
 * Copyright (c) 2019 JCATMAN INSTABUILD
 */

import React, { Component } from 'react';
import styles from './Contracts.module.scss';
import Navbar from '../../components/Contracts/Navbar/Navbar';
import NewContract from '../../components/Contracts/NewContract/NewContract';

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      scroll: 'body',
      fullWidth: true,
      maxWidth: 'md',
      expanded: 'GeneralInfo',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className={styles.Contracts}>
        <Navbar
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          scroll={this.state.scroll}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          expanded={this.state.expanded}
        />
        <NewContract
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          scroll={this.state.scroll}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          expanded={this.state.expanded}
          open={this.state.open}
        />
      </div>
    );
  }
}
export default Contracts;
