import React, { useState, Fragment } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import SideMenu from '../../../components/Sidebar/SideMenu';
import CollapseAndExpand from '../../../components/CollapseAndExpand/CollapseAndExpand';
import UserSideMenu from '../../../components/Sidebar/UserSideMenu';
import styles from './Dashboard.module.scss';
import { UserRoutes } from '../../../routes/local/routes';

const Dashboard = (props) => {
  const [resizableWidth, setResizableWidth] = useState(200);
  const [isHidenArrow, setIsHidenArrow] = useState(false);
  const [isMenuHidden, setHideMenu] = useState(false);
  const onChangeSize = (expandibleValue) => {
    setResizableWidth(expandibleValue);
    console.log(expandibleValue);
    setHideMenu(expandibleValue <= 0)
  };
  const onHideArrow = (arrowValue) => {
    setIsHidenArrow(arrowValue);
  };

  const hideLetter = () => {
    if (isHidenArrow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.Dashboard}>
      <nav className={styles.Navigation}>
        <Sidebar />
        {props.location.pathname.includes(UserRoutes.base) && (
          <Fragment>
            <UserSideMenu
              onHideArrow={onHideArrow}
              hideLetter={hideLetter}
              resizableWidth={resizableWidth}
            />
          </Fragment>
        )}
        {props.location.pathname.includes(UserRoutes.slideProjectsOnly) ||
        props.location.pathname.includes(UserRoutes.base) ? (
          <div></div>
        ) : (
          <Fragment>
            <SideMenu
              onHideArrow={onHideArrow}
              hideLetter={hideLetter}
              resizableWidth={resizableWidth}
              tower={props.tower}
              onChange={onChangeSize}
            />
            
          </Fragment>
        )}
        <div className="containerNoRezise">
              <CollapseAndExpand
                onHideArrow={onHideArrow}
                isHidenArrow={isHidenArrow}
                onChange={onChangeSize}
                isMenuHidden={isMenuHidden}
              />
            </div>
      </nav>

      <main className={styles.Content}>{props.children}</main>
    </div>
  );
};

export default Dashboard;
