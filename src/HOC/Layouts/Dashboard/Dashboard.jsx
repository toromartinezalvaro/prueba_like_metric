import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import SideMenu from '../../../components/Sidebar/SideMenu';
import UserSideMenu from '../../../components/Sidebar/UserSideMenu';
import styles from './Dashboard.module.scss';
import { UserRoutes } from '../../../routes/local/routes';

const dashboard = props => (
  <div className={styles.Dashboard}>
    <nav className={styles.Navigation}>
      <Sidebar />
      {props.location.pathname.includes(UserRoutes.base) ? (
        <UserSideMenu/>
      ) : (
        <SideMenu tower={props.tower} />
      )}
    </nav>

    <main className={styles.Content}>{props.children}</main>
  </div>
);

export default dashboard;
