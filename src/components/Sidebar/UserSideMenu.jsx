import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { DashboardRoutes, UserRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config'
import { Role } from '../../helpers'

const UserSideMenu = props => {
  const [user, setUser] = useState(agent.currentUser);

  useEffect(() => {
    setUser(agent.currentUser)
  });

  var itemForSidebar = (styles, route, iconName, description) => {
    return (
      <div className={styles}>
        <Link to={route}>
          <Icon name={iconName} fixWidth={true} />
          <label className={style.Description}> {description} </label>
        </Link>
      </div>
    );
  };

  return (
    <div className={style.SideMenu + ' ' + style.OriginalWidth}>
      <div>
        <label>{props.tower ? props.tower.name : ''}</label>
      </div>
      <div className={style.IconsContainer}>
        {itemForSidebar(
          style.MenuItem,
          UserRoutes.base,
          'fa-building',
          'Perfil',
        )}
        {agent.isAuthorized([Role.Admin, Role.Super]) && itemForSidebar(
          style.MenuItem,
          UserRoutes.base + UserRoutes.create,
          'fa-building',
          'Crear usuario'
        )}
      </div>
    </div>
  );
};

export default UserSideMenu;
