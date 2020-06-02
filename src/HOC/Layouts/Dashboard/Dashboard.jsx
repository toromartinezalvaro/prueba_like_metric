import React, { useState, Fragment } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import SideMenu from '../../../components/Sidebar/SideMenu';
import CollapseAndExpand from '../../../components/CollapseAndExpand/CollapseAndExpand';
import UserSideMenu from '../../../components/Sidebar/UserSideMenu';
import styles from './Dashboard.module.scss';
import {
  UserRoutes,
  ContractRoutes,
  GroupsRoutes,
} from '../../../routes/local/routes';

const Dashboard = (props) => {
  const [resizableWidth, setResizableWidth] = useState(250);
  const [isHidenArrow, setIsHidenArrow] = useState(false);
  const [isMenuHidden, setHideMenu] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const onChangeSize = (expandibleValue) => {
    setResizableWidth(expandibleValue);
    setHideMenu(expandibleValue <= 17);
  };

  const onChangeShowContent = (value) => {
    setShowContent(value);
  };

  const onHideArrow = (arrowValue) => {
    setIsHidenArrow(arrowValue);
  };

  const hideLetter = () => {
    if (isHidenArrow) {
      return true;
    }
    return false;
  };

  const userValidation =
    props.location.pathname.includes(UserRoutes.base) ||
    props.location.pathname.includes(GroupsRoutes.base);

  const projectValidation =
    props.location.pathname.includes(UserRoutes.slideProjectsOnly) ||
    props.location.pathname.includes(UserRoutes.base) ||
    props.location.pathname.includes(GroupsRoutes.base);

  return (
    <div className={styles.Dashboard}>
      <nav className={styles.Navigation}>
        <Sidebar />
        {userValidation && (
          <Fragment>
            <UserSideMenu
              onHideArrow={onHideArrow}
              isHidenArrow={isHidenArrow}
              resizableWidth={resizableWidth}
              onChange={onChangeSize}
              isMenuHidden={isMenuHidden}
            />
          </Fragment>
        )}
        {!projectValidation && (
          <Fragment>
            <SideMenu
              onHideArrow={onHideArrow}
              hideLetter={hideLetter}
              resizableWidth={resizableWidth}
              tower={props.tower}
              onChange={onChangeSize}
              showContent={showContent}
              onChangeShowContent={onChangeShowContent}
            />
          </Fragment>
        )}
        <div className="containerNoRezise">
          <CollapseAndExpand
            onHideArrow={onHideArrow}
            isHidenArrow={isHidenArrow}
            onChange={onChangeSize}
            isMenuHidden={isMenuHidden}
            onChangeShowContent={onChangeShowContent}
          />
        </div>
      </nav>

      <main className={styles.Content}>{props.children}</main>
    </div>
  );
};
export default Dashboard;
