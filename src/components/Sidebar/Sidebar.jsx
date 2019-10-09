import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProjectRoutes,
  DashboardRoutes,
  ContractRoutes,
} from '../../routes/local/routes';
import style from './Sidebar.module.scss';
import Icon from '../../assets/icons/Icon';

const sidebar = () => {
  const itemForSlidebar = (styles, route, iconName) => {
    return (
      <div className={styles}>
        <Link to={route}>
          <Icon name={iconName} fixWidth={true} />
        </Link>
      </div>
    );
  };

  return (
    <div className={style.Sidebar}>
      {itemForSlidebar(
        `${style.Start} ${style.MenuItem}`,
        DashboardRoutes.base + ProjectRoutes.base,
        'fa-file-contract',
      )}
      {itemForSlidebar(
        `${style.MenuItem}`,
        DashboardRoutes.base + DashboardRoutes.user,
        'fa-user-tie',
      )}
      {itemForSlidebar(
        `${style.MenuItem}`,
        DashboardRoutes.base + ContractRoutes.base,
        'fas fa-file-signature',
      )}
    </div>
  );
};

export default sidebar;
