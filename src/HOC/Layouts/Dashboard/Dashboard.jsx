import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar'
import SideMenu from '../../../components/Sidebar/SideMenu'
import styles from './Dashboard.module.scss';

const dashboard = (props) => (
  <div className={styles.Dashboard}>
    <nav className={styles.Navigation}>
      <Sidebar />
      <SideMenu tower={props.tower} />
    </nav>

    <main className={styles.Content}>
      {props.children}
    </main>
  </div>
);


export default dashboard;