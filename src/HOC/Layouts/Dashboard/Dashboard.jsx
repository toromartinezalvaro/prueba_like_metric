import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import SideMenu from '../../../components/Sidebar/SideMenu';
import CollapseAndExpand from '../../../components/CollapseAndExpand/CollapseAndExpand';
import UserSideMenu from '../../../components/Sidebar/UserSideMenu';
import styles from './Dashboard.module.scss';
import { UserRoutes } from '../../../routes/local/routes';

const Dashboard = (props) => {
  const [ResizableWidth, setResizableWidth] = useState('210px');
  const onChangeSize = (expandibleValue) => {
    setResizableWidth(expandibleValue);
  };

  return (
    <div className={styles.Dashboard}>
      <nav className={styles.Navigation}>
        <Sidebar />
        {props.location.pathname.includes(UserRoutes.base) ? (
          <UserSideMenu />
        ) : (
          <SideMenu Resizable_Width={ResizableWidth} tower={props.tower} />
        )}
        <CollapseAndExpand onChange={onChangeSize} />
      </nav>

      <main className={styles.Content}>{props.children}</main>
    </div>
  );
};

export default Dashboard;
