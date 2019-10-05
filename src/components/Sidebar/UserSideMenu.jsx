import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardRoutes, UserRoutes } from '../../routes/local/routes';
import style from './SideMenu.module.scss';
import Icon from '../../assets/icons/Icon';
import agent from '../../config/config';
import { Role } from '../../helpers';
import { Resizable } from 're-resizable';

const UserSideMenu = (props) => {
  const [user, setUser] = useState(agent.currentUser);
  const Resizable_Width = 325;
  useEffect(() => {
    setUser(agent.currentUser);
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
    <Resizable
      className={style.SideMenu + ' ' + style.OriginalWidth}
      defaultSize={{ width: `${Resizable_Width}` }}
    >
      <div className={style.fixedWidth}>
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
          {agent.isAuthorized([Role.Admin, Role.Super]) &&
            itemForSidebar(
              style.MenuItem,
              UserRoutes.base + UserRoutes.create,
              'fa-building',
              'Crear usuario',
            )}
          {itemForSidebar(
            style.MenuItem,
            UserRoutes.base + UserRoutes.assignProjects,
            'fa-building',
            'Admin usuarios',
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default UserSideMenu;
