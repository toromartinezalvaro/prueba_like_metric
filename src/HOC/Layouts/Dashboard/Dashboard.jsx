import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import SideMenu from '../../../components/Sidebar/SideMenu';
import CollapseAndExpand from '../../../components/CollapseAndExpand/CollapseAndExpand';
import UserSideMenu from '../../../components/Sidebar/UserSideMenu';
import styles from './Dashboard.module.scss';
import { UserRoutes } from '../../../routes/local/routes';

const Dashboard = (props) => {
  const [resizableWidth, setResizableWidth] = useState('200px');
  const [isHidenArrow, setIsHidenArrow] = useState(false);
  const onChangeSize = (expandibleValue) => {
    setResizableWidth(expandibleValue);
  };
  const onHideArrow = (arrowValue) => {
    setIsHidenArrow(arrowValue)
  }

  const hideLetter = () => {
    if(isHidenArrow) {
      return(true);
    }
    else {
      return (false)
    }
  }

  return (
    <div className={styles.Dashboard}>
      <nav className={styles.Navigation}>
        <Sidebar />
        {props.location.pathname.includes(UserRoutes.base) ? (
          <UserSideMenu />
        ) : (
          <SideMenu onHideArrow={onHideArrow} hideLetter = {hideLetter} resizableWidth={resizableWidth} tower={props.tower} />
        )}
        <CollapseAndExpand onHideArrow={onHideArrow} isHidenArrow = {isHidenArrow} onChange={onChangeSize} />
      </nav>

      <main className={styles.Content}>{props.children}</main>
    </div>
  );
};

export default Dashboard;
